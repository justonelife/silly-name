import './global.css';
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={orbitron.className}>
      <body className='bg-primary h-svh w-screen'>{children}</body>
    </html>
  );
}
