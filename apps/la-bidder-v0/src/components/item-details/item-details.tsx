import './item-details.css';
import { Outfit } from 'next/font/google';
import EthereumOne from '@/assets/icons/ethereum-1.svg';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function ItemDetails(): React.ReactNode {
  return (
    <div className="grow space-y-6">
      <div className="space-y-2">
        <p className="text-2xl font-bold text-center">#100</p>
        <p className="id__name font-black text-center">Xmas Goblin</p>
        <p
          className={`${outfit.className} text-base font-medium opacity-70 text-center`}
        >
          By LunaAI
        </p>
      </div>

      <div className="space-y-1">
        <p
          className={`${outfit.className} text-base font-medium opacity-70 capitalize text-center`}
        >
          last bid
        </p>
        <div className="font-bold text-2xl flex items-center justify-center">
          <EthereumOne />
          ETH 3.31
        </div>
      </div>

      <div className="p-4">tags</div>

      <hr className="mx-auto !my-10 w-[195px] h-[1px] opacity-50 bg-white"></hr>

      <div className="space-y-8">
        <p className="text-lg font-bold text-center capitalize">
          place history
        </p>

        <div>chart</div>
      </div>
    </div>
  );
}
