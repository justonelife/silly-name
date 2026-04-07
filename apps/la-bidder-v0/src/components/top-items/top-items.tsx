import ItemSimpleCard from '../ui/item-simple-card/item-simple-card';
import { fetchItems } from '@/lib/api';

export default async function TopItems(): Promise<React.ReactNode> {
  const params = await fetchItems(3, 1);
  const items = Array.isArray(params) ? params : params.data;

  if (!items || items.length === 0) {
    return <div className="p-4 text-white">No items found.</div>;
  }

  return (
    <div className="flex gap-4">
      {items.map((item) => (
        <ItemSimpleCard key={item.id} item={item} />
      ))}
    </div>
  );
}
