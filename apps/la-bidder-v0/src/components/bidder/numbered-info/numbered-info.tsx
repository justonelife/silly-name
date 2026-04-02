import Card from "@/components/ui/card/card";
import { Quicksand, Outfit } from "next/font/google";

interface NumberedInfoProps {
  quantityStr: string;
  title: string;
}

const quicksand = Quicksand();
const outfit = Outfit();

export default function NumberedInfo({ quantityStr, title }: NumberedInfoProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Card className={`${quicksand.className} text-lg font-semibold h-11 self-stretch`}>
        {quantityStr}
      </Card>
      <span className={`${outfit.className} text-sm font-bold capitalize`}>
        {title}
      </span>
    </div>
  )
}
