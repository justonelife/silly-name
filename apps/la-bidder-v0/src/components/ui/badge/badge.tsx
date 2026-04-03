import './badge.css';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  className,
}: BadgeProps): React.ReactNode {
  return (
    // TODO: convert px to rem?
    <div
      className={`${className} badge text-sm font-black px-4 py-2 rounded-3xl backdrop-blur-[96px]`}
    >
      {children}
    </div>
  );
}
