import TopItems from '@/components/top-items/top-items';
import Button from '@/components/ui/button/button';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const outfit = Outfit();

export default function Index() {
  return (
    <div className="pt-[72px]">
      <div className="space-y-20 px-4">
        <div className="space-y-10">
          <p className="text-6xl font-bold leading-[82px]">
            Discover, find, and sell Labubu NFTs
          </p>

          <p className={`${outfit.className} text-2xl font-normal leading-10`}>
            The world’s first and unlimited digital marketplace for Labubu
            tokens
          </p>

          <Button className="button--special rounded-sm backdrop-blur-[96px] border-2 border-solid border-[#ffa6fa] flex items-center justify-center px-24 py-[18px] text-lg font-bold">
            Explore
          </Button>
        </div>

        <div className="space-y-12">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">Top Labubu now</h3>

            <Link href="/">
              <Image
                src="arrow-right.svg"
                alt="arrow-right"
                width={48}
                height={24}
              ></Image>
            </Link>
          </div>

          <div>
            <TopItems></TopItems>
          </div>
        </div>
      </div>
    </div>
  );
}
