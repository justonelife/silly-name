import { Outfit } from 'next/font/google';
import Input from '@/components/ui/input/input';
import MonthlyItemsSearchList from './list/list';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function MonthlyItemsSearch(): React.ReactNode {
  return (
    <div className="space-y-[68px]">
      <div className="px-[94px]">
        <h2 className="text-[38px] font-bold text-center mb-5">
          MONTHLY LABUBU TREASURES
        </h2>

        <p
          className={`${outfit.className} text-xl font-medium opacity-70 text-center mb-20`}
        >
          Discover one of the most cutest NFT creations created for you. Place
          your bid and be the first to have these treasures. All of the artworks
          are limited selections.
        </p>

        <div className="flex justify-center">
          {/* TODO: Implement Input */}
          <Input></Input>
        </div>
      </div>

      <MonthlyItemsSearchList></MonthlyItemsSearchList>
    </div>
  );
}
