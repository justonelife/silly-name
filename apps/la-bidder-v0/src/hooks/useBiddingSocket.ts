import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { BidNewEvent, AuctionEndedEvent } from '@org/shared-types';

export function useBiddingSocket(itemId: string): {
  latestBid: BidNewEvent | null;
  auctionEnded: AuctionEndedEvent | null;
  connected: boolean;
} {
  const [latestBid, setLatestBid] = useState<BidNewEvent | null>(null);
  const [auctionEnded, setAuctionEnded] = useState<AuctionEndedEvent | null>(
    null
  );
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!itemId) return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
    // Append the /bidding namespace if it's not present (next config may omit it)
    const socket: Socket = io(
      wsUrl.endsWith('/bidding') ? wsUrl : `${wsUrl}/bidding`,
      {
        transports: ['websocket'],
      }
    );

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join-item', { itemId });
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('bid-new', (data: BidNewEvent) => {
      if (data.itemId === itemId) setLatestBid(data);
    });

    socket.on('auction-ended', (data: AuctionEndedEvent) => {
      if (data.itemId === itemId) setAuctionEnded(data);
    });

    return () => {
      socket.emit('leave-item', { itemId });
      socket.disconnect();
    };
  }, [itemId]);

  return { latestBid, auctionEnded, connected };
}
