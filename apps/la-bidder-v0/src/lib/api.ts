import { Item, Paginated, Bid, PlaceBidRequest } from '@org/shared-types';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchItems(
  limit?: number,
  page = 1
): Promise<Paginated<Item> | Item[]> {
  const url = new URL(`${API_URL}/items`);
  if (limit) url.searchParams.append('limit', limit.toString());
  url.searchParams.append('page', page.toString());

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store', // ensuring real data is fetched especially for bidding app
  });
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function fetchItemDetail(id: string): Promise<Item> {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch item detail');
  return res.json();
}

export async function placeBid(
  id: string,
  request: PlaceBidRequest
): Promise<Bid> {
  const res = await fetch(`${API_URL}/items/${id}/bids`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || 'Failed to place bid');
  }
  return res.json();
}

export async function fetchItemBids(
  id: string,
  limit?: number,
  page = 1
): Promise<Paginated<Bid> | Bid[]> {
  const url = new URL(`${API_URL}/items/${id}/bids`);
  if (limit) url.searchParams.append('limit', limit.toString());
  url.searchParams.append('page', page.toString());

  const res = await fetch(url.toString(), {
    method: 'GET',
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch bids');
  return res.json();
}
