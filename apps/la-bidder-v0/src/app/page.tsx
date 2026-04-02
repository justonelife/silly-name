import BidderCard from '@/components/bidder/bidder-card';
import Header from '@/components/ui/header';

export default function Index() {
  return (
    <div className='flex'>

      <main className='grow p-8'>
        <Header></Header>
      </main>

      <aside className='w-[424px] px-6 py-8'>

        {/* TODO: implement position sticky */}
        <BidderCard></BidderCard>
      </aside>
    </div>
  );
}
