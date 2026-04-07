'use client';

import './item-details.css';
import { Outfit } from 'next/font/google';
import { Item } from '@org/shared-types';
import { useBiddingSocket } from '@/hooks/useBiddingSocket';
import { getUserId } from '@/lib/user';
import { placeBid } from '@/lib/api';
import { useState } from 'react';

const outfit = Outfit({ subsets: ['latin'] });

export default function ItemDetails({
  initialItem,
}: {
  initialItem: Item;
}): React.ReactNode {
  const { latestBid, auctionEnded } = useBiddingSocket(initialItem.id);
  const [amount, setAmount] = useState<number>(initialItem.currentPrice + 0.1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentPrice = latestBid
    ? latestBid.currentPrice
    : initialItem.currentPrice;
  const currentWinner = auctionEnded?.winnerUserId || null;
  const isEnded =
    auctionEnded !== null ||
    initialItem.status === 'ENDED' ||
    new Date(initialItem.auctionEndAt) <= new Date();

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await placeBid(initialItem.id, { userId: getUserId(), amount });
      setAmount(Number(currentPrice) + 0.1); // suggest next bid
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grow space-y-6 max-w-lg">
      <div className="space-y-2">
        <p className="text-2xl font-bold text-center text-white/50">
          {initialItem.id.split('-')[0]}
        </p>
        <p className="id__name font-black text-center text-4xl">
          {initialItem.name}
        </p>
        <p
          className={`${outfit.className} text-base font-medium opacity-70 text-center`}
        >
          By {initialItem.creator}
        </p>
      </div>

      <div className="space-y-1">
        <p
          className={`${outfit.className} text-base font-medium opacity-70 capitalize text-center`}
        >
          {isEnded ? 'Winning bid' : 'Current price'}
        </p>
        <div className="font-bold text-3xl flex items-center justify-center text-green-400">
          <span className="mr-2">♦</span>
          ETH{' '}
          {typeof currentPrice === 'number'
            ? currentPrice.toFixed(2)
            : Number(currentPrice).toFixed(2)}
        </div>
      </div>

      {initialItem.tags && initialItem.tags.length > 0 && (
        <div className="flex gap-2 justify-center py-4">
          {initialItem.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-white/10 rounded-full uppercase text-xs font-bold"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <hr className="mx-auto !my-10 w-[195px] h-[1px] opacity-20 bg-white" />

      <div className="space-y-8 bg-white/5 p-6 rounded-lg backdrop-blur-sm">
        <h3 className="text-xl font-bold text-center capitalize mb-4">
          {isEnded ? 'Auction Ended' : 'Place a Bid'}
        </h3>

        {isEnded ? (
          <div className="text-center font-bold text-lg text-yellow-300">
            {currentWinner
              ? `Winner: ${currentWinner.split('-')[0]}...`
              : 'No winner / Item Unsold'}
          </div>
        ) : (
          <form onSubmit={handleBid} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm opacity-70 mb-1">
                Bid Amount (ETH)
              </label>
              <input
                type="number"
                step="0.01"
                min={Number(currentPrice) + 0.01}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-black/30 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-white/50"
                disabled={loading || isEnded}
              />
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading || isEnded}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 rounded transition"
            >
              {loading ? 'Submitting...' : 'Submit Bid'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
