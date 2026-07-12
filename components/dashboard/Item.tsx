type ItemProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Item({ title, children }: Readonly<ItemProps>) {
  return (
    <div
      className={`p-5 rounded-xl bg-white border flex flex-col gap-2 border-[#D7ECEF] h-full`}
    >
      <p className="text-[#0B2E33] font-semibold">{title}</p>
      {children}
    </div>
  );
}
