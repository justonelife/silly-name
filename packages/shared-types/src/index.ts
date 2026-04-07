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
