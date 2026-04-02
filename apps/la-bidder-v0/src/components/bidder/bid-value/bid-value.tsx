interface BidValueProps {
  title: string;
  value: number;
  currency?: string;
  active?: boolean;
}

export default function BidValue({ title, value, currency = 'ETH', active = true }: BidValueProps): React.ReactNode {
  return (
    <div className={`flex flex-col ${active ? 'opacity-100' : 'opacity-50'}`}>
      <p className="text-xs font-normal text-[#93c5fd]">{title}</p>

      <p className="text-sm font-semibold inline-flex gap-1">
        <span>
          {value}
        </span>
        <span>
          {currency}
        </span>

      </p>
    </div>
  )
}
