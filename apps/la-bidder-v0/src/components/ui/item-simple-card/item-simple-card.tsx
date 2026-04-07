import './item-simple-card.css';
import { Item } from '@org/shared-types';
import Link from 'next/link';

export default function ItemSimpleCard({
  item,
}: {
  item: Item;
}): React.ReactNode {
  return (
    <Link href={`/${item.id}`} className="block">
      <div className="w-[284px] h-[319px] relative bg-[#49b649] p-4 text-white hover:opacity-90 transition">
        <p className="text-[26px] font-black break-words leading-tight">
          {item.name}
        </p>
        <div
          className="item-simple-card--image absolute left-1/2 -translate-x-1/2 top-[82px] w-[175px] h-[266px] bg-no-repeat bg-cover bg-center"
          style={
            item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : {}
          }
        ></div>

        <div className="absolute flex flex-col gap-1 bg-white/10 px-3 py-2 right-0 bottom-2 text-white">
          <p className="text-lg font-black">{item.currentPrice}</p>
          <p className="uppercase text-[10px] font-bold">eth</p>
        </div>
      </div>
    </Link>
  );
}
