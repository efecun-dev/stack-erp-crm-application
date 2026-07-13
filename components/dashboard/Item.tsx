type ItemProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Item({ title, children }: Readonly<ItemProps>) {
  return (
    <div
      // Sonuna min-w-0 eklendi.
      className={`p-5 rounded-xl bg-white border flex flex-col gap-2 border-[#D7ECEF] h-full min-w-0`}
    >
      <p className="text-[#0B2E33] font-semibold">{title}</p>

      {/* Grafiğin flex alanını doğru doldurması için ekstra bir sargı */}
      <div className="flex-1 w-full min-w-0">{children}</div>
    </div>
  );
}
