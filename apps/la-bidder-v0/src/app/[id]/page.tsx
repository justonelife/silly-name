import ItemDetails from '@/components/item-details/item-details';
import Button from '@/components/ui/button/button';
import { fetchItemDetail } from '@/lib/api';
import Link from 'next/link';

export default async function Index({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const item = await fetchItemDetail(id);

  return (
    <div className="pt-7 pl-8 text-white min-h-screen">
      <div className="flex justify-between mb-[71px]">
        <Link href="/">
          <Button>back</Button>
        </Link>
      </div>

      <section className="flex flex-wrap gap-8 items-start">
        <div
          className="w-[413px] h-[551px] bg-[#49b649] bg-center bg-cover bg-no-repeat rounded-lg"
          style={
            item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : {}
          }
        ></div>
        <ItemDetails initialItem={item} />
      </section>
    </div>
  );
}
