interface Props {
  data: any[];
  className?: string | null;
}

export const SubTotal = ({ data, className }: Props) => {
  return (
    <div className="font-semibol sticky bottom-0 mb-4 flex justify-between rounded-md border-x-[1px] border-b-[1px] bg-white p-2 text-sm">
      <p className={`${className}`}>합계</p>
      {data.map((item, index) => (
        <p className="pr-4" key={index}>
          {item.totalAmount}
        </p>
      ))}
    </div>
  );
};
