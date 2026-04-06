import Autocomplete from '@/components/ui/autocomplete/autocomplete';
import ItemComplexCard from '@/components/ui/item-complex-card/item-complex-card';

export default function Index(): React.ReactNode {
  return (
    <div>
      <div className="pt-12 px-10 pb-6 flex flex-col gap-6 items-center">
        <Autocomplete></Autocomplete>
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
