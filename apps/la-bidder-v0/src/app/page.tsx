import MonthlyItemsSearch from '@/components/monthly-items-search/monthly-items-search';
import TopItems from '@/components/top-items/top-items';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function Index() {
  return (
    <div className="pt-[72px]">
      {/* SECTION TOP */}
      <div className="space-y-20 px-10 pb-[110px]">
        <div className="space-y-10">
          <p className="text-6xl font-bold leading-[82px]">
            Discover, find, and sell Labubu NFTs
          </p>

          <p className={`${outfit.className} text-2xl font-normal leading-10`}>
            The world’s first and unlimited digital marketplace for Labubu
            tokens
          </p>

          <Link
            href="/explore"
            className="button--special inline-block rounded-sm backdrop-blur-[96px] border-2 border-solid border-[#ffa6fa] px-24 py-[18px] text-lg font-bold leading-5"
          >
            Explore
          </Link>
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

      {/* END SECTION TOP */}

      {/* SECTION BOTTOM */}
      <div className="pt-[145px]">
        <MonthlyItemsSearch></MonthlyItemsSearch>
      </div>
    </div>
  );
}
