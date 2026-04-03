import ItemComplexCard from '@/components/ui/item-complex-card/item-complex-card';

export default function MonthlyItemsSearchList(): React.ReactNode {
  return (
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
  );
}
