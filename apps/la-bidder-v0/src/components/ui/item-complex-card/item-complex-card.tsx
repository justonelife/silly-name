import Button from '@/components/ui/button/button';
import './item-complex-card.css';
import { Outfit } from 'next/font/google';
import Badge from '@/components/ui/badge/badge';
import { Item } from '@org/shared-types';
import Link from 'next/link';

const outfit = Outfit({ subsets: ['latin'] });

export default function ItemComplexCard({
  item,
}: {
  item: Item;
}): React.ReactNode {
  return (
    <Link href={`/${item.id}`} className="block h-full text-white">
      <div className="w-full h-full bg-[#4962b6] min-h-[405px] flex flex-col relative hover:shadow-lg transition">
        {item.tags?.length > 0 && (
          <Badge className="absolute -left-4 -translate-y-1/2 uppercase text-white">
            {item.tags[0]}
          </Badge>
        )}

        <div className="h-[255px] relative text-white">
          <div
            className="left-1/2 -translate-x-1/2 absolute item-complex-card__image w-[313px] h-[327px] z-10 -bottom-[22px] bg-center bg-cover bg-no-repeat"
            style={
              item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : {}
            }
          ></div>
        </div>

        <div className="item-complex-card__controls p-4 pt-[22px] backdrop-blur-[4px] grow space-y-4">
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-lg font-bold">{item.name}</p>
              <p
                className={`${outfit.className} text-base font-medium opacity-70`}
              >
                By {item.creator}
              </p>
            </div>

            <div className={`${outfit.className} text-sm font-bold opacity-70`}>
              {new Date(item.auctionEndAt) > new Date() ? 'LIVE' : 'ENDED'}
            </div>
          </div>

          <div className="flex justify-between items-center text-white">
            <div className="flex gap-2 items-center">
              <span className="text-xl">♦</span>
              <p className={`${outfit.className} text-lg font-bold`}>
                {item.currentPrice} ETH
              </p>
            </div>

            <Button>
              <span>
                {item.status === 'LIVE' ? 'Place a Bid' : 'View View'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
