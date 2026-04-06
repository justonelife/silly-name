import Card from '@/components/ui/card/card';
import Image from 'next/image';
import { Outfit } from 'next/font/google';
import BidValue from '../bid-value/bid-value';
import Button from '@/components/ui/button/button';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function BiddingItem(): React.ReactNode {
  return (
    <Card className="h-[104px]">
      <div className="flex gap-4 justify-between grow">
        <Image
          src="/images/christmas-girl.png"
          alt="christmas-girl"
          width={72}
          height={72}
          className="rounded-lg"
        ></Image>
        <div className="grow flex flex-col gap-2">
          <div className="flex justify-between gap-1">
            <p className="font-semibold text-sm">Christmas Girl</p>
            <p className={`${outfit.className} text-sm font-bold`}>7h:4m:8s</p>
          </div>

          <div className={`${outfit.className} flex gap-2 justify-between`}>
            <BidValue title="Latest Bid" value={5.2}></BidValue>
            <BidValue title="Your Bid" value={3.2} active={false}></BidValue>

            {/* TODO: font-family: var(--typography-family-body, "Frutiger Neue for Post"); */}
            <Button className="py-0 px-2 rounded-lg border border-solid border-white text-xs">
              Bit more
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
