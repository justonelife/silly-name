import Image from 'next/image';
import './bidder-card.css';
import NumberedInfo from './numbered-info/numbered-info';
import SomethingAdd from './something-add/something-add';
import { Outfit } from 'next/font/google';
import BiddingItem from './bidding-item/bidding-item';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function BidderCard(): React.ReactNode {
  return (
    <div className="space-y-12 rounded-2xl border-[3px] border-solid bidder-card pt-[72px] px-6 text-white">
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Image src="muji.svg" alt="muji-logo" width={88} height={88}></Image>
          <h1 className="font-semibold text-2xl">MUJI Team</h1>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <NumberedInfo quantityStr="12" title="assets"></NumberedInfo>
          <NumberedInfo quantityStr="10k" title="followers"></NumberedInfo>
          <NumberedInfo quantityStr="70k" title="likes"></NumberedInfo>
          <NumberedInfo quantityStr="60" title="bidding"></NumberedInfo>
        </div>

        <SomethingAdd></SomethingAdd>
      </div>

      <div className="space-y-[14px]">
        <div
          className={`${outfit.className} flex justify-between items-center`}
        >
          <h2 className="text-[20px] font-bold capitalize">your biddings</h2>
          <span className="text-sm font-bold">3 items</span>
        </div>

        <BiddingItem></BiddingItem>
        <BiddingItem></BiddingItem>
        <BiddingItem></BiddingItem>
      </div>
    </div>
  );
}
