import Button from '@/components/ui/button/button';
import './item-complex-card.css';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import Badge from '@/components/ui/badge/badge';

const outfit = Outfit();

export default function ItemComplexCard(): React.ReactNode {
  {
    /* TODO: Check these custom classes; should not be there */
  }
  return (
    <div className="w-full h-full bg-[#4962b6] min-h-[405px] flex flex-col relative">
      <Badge className="absolute -left-4 -translate-y-1/2">FLASH SALE</Badge>

      <div className="h-[255px] relative">
        <div className="left-1/2 -translate-x-1/2 absolute item-complex-card__image w-[313px] h-[327px] z-10 -bottom-[22px]"></div>
      </div>

      <div className="item-complex-card__controls p-4 pt-[22px] backdrop-blur-[4px] grow space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold">Baby boy</p>
            <p
              className={`${outfit.className} text-base font-medium opacity-70`}
            >
              By LunaAI
            </p>
          </div>

          <div className={`${outfit.className} text-sm font-bold`}>
            7h:4m:8s
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Image
              src="ethereum-2.svg"
              width={32}
              height={32}
              alt="ethereum 2"
            ></Image>
            <p className={`${outfit.className} text-lg font-bold`}>9.30 ETH</p>
          </div>

          <Button>Place a Bid</Button>
        </div>
      </div>
    </div>
  );
}
