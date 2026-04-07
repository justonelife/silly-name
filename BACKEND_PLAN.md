# NestJS Bidding Backend — Implementation Plan

## What's Done

- [x] Feature branch `feat/nestjs-bidding-api` created
- [x] `@nx/nest` installed, NestJS app `la-bidder-api` scaffolded at `apps/la-bidder-api`
- [x] Runtime dependencies installed: TypeORM, pg, Socket.io, NestJS schedule, config, class-validator
- [x] `docker-compose.yml` created at root (PostgreSQL 16 + pgAdmin)
- [x] Docker containers running:
  - PostgreSQL → `localhost:5432`
  - pgAdmin → `http://localhost:5050` (admin@labidder.local / admin)
- [x] All source files written (see structure below)
- [x] Build passing (`npx nx build la-bidder-api`)

---

## Source Structure

```
apps/la-bidder-api/src/
├── main.ts                          # Bootstrap: CORS, ValidationPipe, port 3001
├── app/
│   └── app.module.ts                # Root module wiring everything together
├── entities/
│   ├── item.entity.ts               # Item (id, name, creator, imageUrl, tags, prices, auctionEndAt, status)
│   └── bid.entity.ts                # Bid (id, itemId, userId, amount, createdAt)
├── items/
│   ├── items.module.ts
│   ├── items.controller.ts
│   ├── items.service.ts
│   └── dto/place-bid.dto.ts
├── admin/
│   ├── admin.module.ts
│   ├── admin.controller.ts
│   ├── admin.service.ts
│   └── dto/create-item.dto.ts
├── bidding/
│   ├── bidding.module.ts
│   └── bidding.gateway.ts           # WebSocket /bidding namespace
├── scheduler/
│   ├── auction-scheduler.module.ts
│   └── auction-scheduler.service.ts # Cron every minute: close expired auctions
└── seed/
    ├── seed.module.ts
    └── seed.service.ts              # Seeds 3 sample items on first boot (SEED_DATA=true)
```

---

## API Endpoints

### Public
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/items` | List all LIVE items |
| GET | `/api/items/:id` | Get single item detail |
| GET | `/api/items/:id/bids` | Get bid history for item (newest first) |
| POST | `/api/items/:id/bids` | Place a bid |

**Place bid body:**
```json
{ "userId": "<uuidv4>", "amount": 2.5 }
```

### Admin
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/admin/items` | Create & publish a new item for live bidding |

**Create item body:**
```json
{
  "name": "Xmas Goblin",
  "creator": "LunaAI",
  "description": "Limited holiday edition",
  "imageUrl": "https://...",
  "tags": ["holiday", "limited"],
  "startingPrice": 1.85,
  "auctionDurationHours": 24
}
```

---

## WebSocket (Socket.io)

- **Namespace:** `ws://localhost:3001/bidding`
- **Client → Server events:**
  - `join-item` `{ itemId }` — subscribe to live updates for an item
  - `leave-item` `{ itemId }` — unsubscribe
- **Server → Client events:**
  - `bid-new` `{ itemId, userId, amount, currentPrice, timestamp }` — broadcast on new bid
  - `auction-ended` `{ itemId, winnerUserId, winningAmount }` — broadcast when auction closes

---

## Bid Rules

- User identity: client-generated UUIDv4, sent in request body as `userId`
- New bid must exceed current price by at least **0.01 ETH**
- Bids rejected if auction status is `ENDED` or `auctionEndAt` has passed
- Auction auto-closes via cron job running **every minute**

---

## Environment

File: `apps/la-bidder-api/.env`
```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=labidder
DB_PASSWORD=labidder_pass
DB_NAME=labidder
SEED_DATA=true
```

---

## Next Steps (not started)

- [x] Serve the app: `npx nx serve la-bidder-api`
- [x] Verify DB tables auto-created (TypeORM synchronize: true)
- [x] Verify seed data loads on first boot
- [x] Connect frontend (`la-bidder-v0`) to the API
- [x] Integrate WebSocket client in Next.js frontend
- [x] Add pagination to `GET /api/items` and `GET /api/items/:id/bids`
- [x] Decide on admin auth (API key header, or leave open for now)
