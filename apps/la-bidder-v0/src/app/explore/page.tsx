import Input from '@/components/ui/input/input';
import ItemComplexCard from '@/components/ui/item-complex-card/item-complex-card';
import Search from '@/assets/icons/search.svg';

export default function Index(): React.ReactNode {
  return (
    <div>
      <div className="pt-12 px-10 pb-6 flex flex-col gap-6 items-center">
        <Input
          wrapperClassName="w-[420px]"
          placeholder="Search..."
          aria-label="Search items"
          prefix={<Search />}
        />
        <div>tags</div>
      </div>

      <div className="py-16 px-8 grid grid-cols-[repeat(2,minmax(422px,1fr))] gap-x-6 gap-y-24">
        <ItemComplexCard></ItemComplexCard>
        <ItemComplexCard></ItemComplexCard>
        <ItemComplexCard></ItemComplexCard>
        <ItemComplexCard></ItemComplexCard>

        <ItemComplexCard></ItemComplexCard>
        <ItemComplexCard></ItemComplexCard>
        <ItemComplexCard></ItemComplexCard>
        <ItemComplexCard></ItemComplexCard>

        <ItemComplexCard></ItemComplexCard>
        <ItemComplexCard></ItemComplexCard>
        <ItemComplexCard></ItemComplexCard>
        <ItemComplexCard></ItemComplexCard>
      </div>
    </div>
  );
}
