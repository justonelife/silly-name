import ItemDetails from '@/components/item-details/item-details';
import Button from '@/components/ui/button/button';

export default function Index(): React.ReactNode {
  return (
    <div className="pt-7 pl-8">
      <div className="flex justify-between mb-[71px]">
        <Button>back</Button>
      </div>

      <section className="flex flex-wrap gap-2">
        <div className="w-[413px]">image</div>
        <ItemDetails></ItemDetails>
      </section>
    </div>
  );
}
