import './item-simple-card.css';

export default function ItemSimpleCard(): React.ReactNode {
  return (
    <div className="w-[284px] h-[319px] relative bg-[#49b649] p-4">
      <p className="text-[26px] font-black">
        Xmas <br /> Goblin
      </p>
      <div className="item-simple-card--image absolute left-1/2 -translate-x-1/2 top-[82px] w-[175px] h-[266px] bg-no-repeat bg-cover bg-center"></div>

      <div className="absolute flex flex-col gap-1 bg-white/10 px-3 py-2 right-0 bottom-2">
        <p className="text-lg font-black">1.85</p>
        <p className="uppercase text-[10px] font-bold">eth</p>
      </div>
    </div>
  );
}
