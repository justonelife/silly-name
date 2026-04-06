import Button from '@/components/ui/button/button';
import Card from '@/components/ui/card/card';
import { Outfit } from 'next/font/google';
import Image from 'next/image';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function SomethingAdd(): React.ReactNode {
  return (
    <Card className={`${outfit.className} h-16`}>
      <div className="flex justify-between w-full">
        <div className="flex gap-3">
          <Image
            src="ethereum.svg"
            alt="ethereum-logo"
            width={32}
            height={32}
          ></Image>
          <span className="text-[20px] font-bold">4,668 ETH</span>
        </div>

        <Button>
          <span className="inline-flex gap-[6px]">
            Add
            {/* TODO: icon lib? */}
            <Image
              src="chevron-right.svg"
              alt="chevron-right"
              width={16}
              height={16}
            ></Image>
          </span>
        </Button>
      </div>
    </Card>
  );
}
