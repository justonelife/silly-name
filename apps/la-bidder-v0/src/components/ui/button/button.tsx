interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className }: ButtonProps): React.ReactNode {

  return (
    <button className={className}>{children}</button>
  )
}
