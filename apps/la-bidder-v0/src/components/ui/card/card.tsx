import './card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps): React.ReactNode {
  return (
    <div className={`${className} card flex items-center justify-center rounded-2xl border-2 border-solid backdrop-blur-[5px] p-4`}>
      {children}
    </div>
  )
}
