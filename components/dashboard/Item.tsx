type ItemProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Item({ title, children }: Readonly<ItemProps>) {
  return (
    <div
      className={`p-3 rounded-xl bg-white border flex flex-nowrap flex-col gap-2 border-[#D7ECEF] h-full min-w-0`}
    >
      {title && <p className="text-[#0B2E33] font-semibold">{title}</p>}
      <div className="flex-1 w-full min-w-0">{children}</div>
    </div>
  );
}
