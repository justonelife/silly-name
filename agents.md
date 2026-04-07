# Agent Team: la-bidder Realtime Bidding Backend

## Project Context

Nx monorepo. All tasks are tracked in `BACKEND_PLAN.md`. Before starting any phase, read that file and check which items remain.

**Stack:**
- Backend: NestJS 11 at `apps/la-bidder-api` — port `3001`
- Frontend: Next.js 16 + React 19 at `apps/la-bidder-v0` — port `3000`
- Database: PostgreSQL 16 in Docker (`docker-compose.yml` at root) — port `5432`
- Realtime: Socket.io, namespace `/bidding`
- Package manager: `npm` (never pnpm or yarn)
- Task runner: `npx nx <target> <project>`

**Env file:** `apps/la-bidder-api/.env` — DB credentials, PORT, SEED_DATA flag.

---

## Orchestration

The Orchestrator always runs first. It reads `BACKEND_PLAN.md`, decides which phases remain, and delegates to worker agents in this order:

```
Phase 1 → Backend Agent           (verify & serve)
Phase 2 → TypeScript Agent        (shared types)         ← can run parallel with Phase 1
Phase 3 → Frontend Agent          (API integration)      ← parallel sub-tasks below
          WebSocket Agent         (realtime client)      ← parallel with Frontend Agent
Phase 4 → Backend Agent           (pagination + admin auth)
Phase 5 → QA Agent                (end-to-end verification)
```

A phase only starts when all agents of the previous phase report success. On any failure, the failing agent reports the root cause to Orchestrator before retrying — no silent retries.

---

## Agent: Orchestrator

**Role:** Manager. Reads plan, assigns tasks, tracks progress, updates `BACKEND_PLAN.md`.

**On activation:**
1. Read `BACKEND_PLAN.md` — identify unchecked items
2. Determine the lowest incomplete phase
3. Activate the correct worker agent(s) for that phase
4. After worker reports completion, check off items in `BACKEND_PLAN.md`
5. Repeat until all items are checked

**Rules:**
- Never execute code yourself — delegate everything to workers
- If Docker containers are not running, instruct Backend Agent to run `docker compose up -d` first
- If two agents can run in parallel (see chart above), spawn them concurrently

---

## Agent: Backend Agent

**Role:** Worker. NestJS + TypeORM + PostgreSQL.

### Phase 1 — Verify & Serve

1. Ensure Docker is running: `docker compose ps` — if not, `docker compose up -d`
2. Serve the API: `npx nx serve la-bidder-api`
3. Confirm TypeORM auto-created tables (`items`, `bids`) by querying:
   ```
   docker exec la-bidder-postgres psql -U labidder -d labidder -c "\dt"
   ```
4. Confirm seed data (3 items) was inserted:
   ```
   docker exec la-bidder-postgres psql -U labidder -d labidder -c "SELECT name, status FROM items;"
   ```
5. Smoke test all endpoints:
   ```bash
   # List items
   curl http://localhost:3001/api/items

   # Create item (admin)
   curl -X POST http://localhost:3001/api/admin/items \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","creator":"Admin","startingPrice":1.0,"auctionDurationHours":1}'

   # Place bid (replace :id with real uuid from step above)
   curl -X POST http://localhost:3001/api/items/:id/bids \
     -H "Content-Type: application/json" \
     -d '{"userId":"550e8400-e29b-41d4-a716-446655440000","amount":1.02}'
   ```
6. Report results to Orchestrator.

### Phase 4 — Pagination + Admin Auth

**Pagination** — update both endpoints to accept `?page=1&limit=10`:
- `GET /api/items` → `apps/la-bidder-api/src/items/items.service.ts` `findAll()`
- `GET /api/items/:id/bids` → `findBids()`
- Return shape: `{ data: [...], total, page, limit }`

**Admin auth** — protect `POST /api/admin/items` with an `X-Admin-Key` header:
- Read key from env var `ADMIN_KEY`
- Add `ADMIN_KEY=change-me-in-production` to `apps/la-bidder-api/.env`
- Create a guard `apps/la-bidder-api/src/admin/admin-key.guard.ts`
- Apply guard to `AdminController`

**Key files:**
```
apps/la-bidder-api/src/items/items.service.ts
apps/la-bidder-api/src/items/items.controller.ts
apps/la-bidder-api/src/admin/admin.controller.ts
apps/la-bidder-api/src/admin/dto/create-item.dto.ts
apps/la-bidder-api/.env
```

---

## Agent: TypeScript Agent

**Role:** Worker. Shared type contracts between frontend and backend.

### Phase 2 — Shared Types Package

1. Create `packages/shared-types/` as an Nx library:
   ```
   npx nx g @nx/js:library --name=shared-types --directory=packages/shared-types --no-interactive
   ```
2. Export these interfaces from `packages/shared-types/src/index.ts`:

```typescript
// Entities
export interface Item {
  id: string;
  name: string;
  creator: string;
  description: string | null;
  imageUrl: string | null;
  tags: string[];
  startingPrice: number;
  currentPrice: number;
  auctionDurationHours: number;
  auctionEndAt: string; // ISO timestamp
  status: 'LIVE' | 'ENDED';
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  id: string;
  itemId: string;
  userId: string;
  amount: number;
  createdAt: string;
}

// Request DTOs
export interface PlaceBidRequest {
  userId: string; // UUIDv4
  amount: number;
}

export interface CreateItemRequest {
  name: string;
  creator: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  startingPrice: number;
  auctionDurationHours: number;
}

// Paginated response
export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// WebSocket event payloads
export interface BidNewEvent {
  itemId: string;
  userId: string;
  amount: number;
  currentPrice: number;
  timestamp: string;
}

export interface AuctionEndedEvent {
  itemId: string;
  winnerUserId: string | null;
  winningAmount: number | null;
}
```

3. Add `@org/shared-types` to the imports of both `la-bidder-api` and `la-bidder-v0`.

---

## Agent: Frontend Agent

**Role:** Worker. Next.js 16 + React 19. Connects UI to the real API.

### Phase 3 — API Integration

**Setup:**
- Add `NEXT_PUBLIC_API_URL=http://localhost:3001/api` to `apps/la-bidder-v0/.env.local`
- Create `apps/la-bidder-v0/src/lib/api.ts` — typed fetch wrapper using `@org/shared-types`

**User identity:**
- On first page load, check `localStorage.getItem('la-bidder-user-id')`
- If absent, generate a UUIDv4 with `crypto.randomUUID()` and store it
- Export a `getUserId()` helper from `apps/la-bidder-v0/src/lib/user.ts`

**Wire up pages:**

| Component | Current state | Action |
|-----------|---------------|--------|
| `top-items/top-items.tsx` | Hardcoded 3 cards | Fetch `GET /api/items?limit=3` |
| `monthly-items-search/list/list.tsx` | Hardcoded | Fetch `GET /api/items` with pagination |
| `app/[id]/page.tsx` | Static | Fetch `GET /api/items/:id` using route param |
| `item-details/item-details.tsx` | Static data | Render real item fields (name, creator, currentPrice, tags) |
| Bid form | Not implemented | Add input + button calling `POST /api/items/:id/bids` with userId + amount |

**Error/loading states:** show a simple skeleton or "Loading…" text — no libraries needed.

---

## Agent: WebSocket Agent

**Role:** Worker. Socket.io realtime client in Next.js.

### Phase 3 — Realtime Client

1. Install: `npm install socket.io-client`

2. Create `apps/la-bidder-v0/src/hooks/useBiddingSocket.ts`:

```typescript
// Hook contract — implement this
export function useBiddingSocket(itemId: string): {
  latestBid: BidNewEvent | null;
  auctionEnded: AuctionEndedEvent | null;
  connected: boolean;
}
```

Implementation details:
- Connect to `ws://localhost:3001/bidding` (or `NEXT_PUBLIC_WS_URL`)
- On mount: emit `join-item` with `{ itemId }`
- On unmount: emit `leave-item`, disconnect
- Listen for `bid-new` → update `latestBid` state
- Listen for `auction-ended` → update `auctionEnded` state
- Use `useEffect` with `itemId` as dependency
- Import event types from `@org/shared-types`

3. Use the hook in `apps/la-bidder-v0/src/app/[id]/page.tsx`:
   - Show live current price from `latestBid.currentPrice` (override fetched value)
   - Show a countdown to `item.auctionEndAt`
   - If `auctionEnded`, disable the bid form and show winner info

---

## Agent: QA Agent

**Role:** Worker. End-to-end verification across all services.

### Phase 5 — Integration Check

**Pre-check:**
```bash
docker compose ps          # postgres + pgadmin must be healthy
curl http://localhost:3001/api/items  # API must respond
curl http://localhost:3000            # Frontend must respond
```

**Full bid flow test:**
1. Create a short auction (1 hour) via admin endpoint
2. Open frontend — item must appear in listing
3. Navigate to item detail page
4. Place a bid — verify:
   - HTTP 201 response
   - `currentPrice` updates on the page without refresh (WebSocket)
5. Verify pgAdmin at `http://localhost:5050` shows the bid row in the `bids` table
   - Login: `admin@labidder.local` / `admin`
   - Server: host=`la-bidder-postgres`, user=`labidder`, pass=`labidder_pass`

**Report to Orchestrator:** pass/fail for each step with details on any failure.

---

## Quick Reference

| Service | URL | Credentials |
|---------|-----|-------------|
| API | `http://localhost:3001/api` | — |
| WebSocket | `ws://localhost:3001/bidding` | — |
| Frontend | `http://localhost:3000` | — |
| pgAdmin | `http://localhost:5050` | admin@labidder.local / admin |
| PostgreSQL | `localhost:5432` | labidder / labidder_pass / labidder |

| Command | What it does |
|---------|-------------|
| `docker compose up -d` | Start DB + pgAdmin |
| `docker compose down` | Stop (data persists in volumes) |
| `npx nx serve la-bidder-api` | Start API in dev mode |
| `npx nx serve la-bidder-v0` | Start frontend in dev mode |
| `npx nx build la-bidder-api` | Production build |
