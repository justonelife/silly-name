import Header from '@/components/ui/header';
import './global.css';
import { Orbitron } from 'next/font/google';
import BidderCard from '@/components/bidder/bidder-card';

const orbitron = Orbitron({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={orbitron.className}>
      <body className="bg-primary h-svh w-screen text-white">
        <div className="flex w-[1366px] mx-auto">
          <main className="grow p-8">
            <Header></Header>
            {children}
          </main>

          <aside className="min-w-[434px] px-6 py-8">
            {/* TODO: implement position sticky */}
            <BidderCard></BidderCard>
          </aside>
        </div>
      </body>
    </html>
  );
}
