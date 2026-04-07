import ItemComplexCard from '@/components/ui/item-complex-card/item-complex-card';
import { fetchItems } from '@/lib/api';

export default async function MonthlyItemsSearchList(): Promise<React.ReactNode> {
  const params = await fetchItems(20, 1);
  const items = Array.isArray(params) ? params : params.data;

  if (!items || items.length === 0) {
    return (
      <div className="p-16 text-center text-white">
        No items in the marketplace.
      </div>
    );
  }

  return (
    <div className="py-16 px-8 grid grid-cols-[repeat(2,minmax(422px,1fr))] gap-x-6 gap-y-24">
      {items.map((item) => (
        <ItemComplexCard key={item.id} item={item} />
      ))}
    </div>
  );
}
