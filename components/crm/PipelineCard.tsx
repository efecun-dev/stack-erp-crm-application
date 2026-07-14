import Pipeline from "./Pipeline";

type CardProps = {
  status: string;
  total: number;
  amount: number;
  data: {
    title: string;
    company: string;
    amount: number;
    owner: string;
    status: string;
  }[];
};

export default function PipelineCard({
  status,
  total,
  amount,
  data,
}: CardProps) {
  return (
    <>
      <div className="p-3 bg-white border border-[#D7ECEF] rounded-xl flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-sm text-[#0B2E33]">
            <span
              className={`w-2 h-2 rounded-full ${
                status == "discuss"
                  ? "bg-[#85B7EB]"
                  : status == "offered"
                    ? "bg-[#17A2AF]"
                    : status == "won"
                      ? "bg-[#0E7C86]"
                      : status == "lost"
                        ? "bg-[#D7ECEF]"
                        : ""
              }`}
            ></span>
            {status == "discuss"
              ? "Görüşüldü"
              : status == "offered"
                ? "Teklif Verildi"
                : status == "won"
                  ? "Kazanıldı"
                  : status == "lost"
                    ? "Kaybedildi"
                    : ""}
          </div>
          <p className="p-1 rounded-xl bg-[#F4FAFB] text-[#8FA8AB] text-xs font-light">
            {total}
          </p>
        </div>
        <p className="text-gray-400 text-xs font-light">
          Toplam {`₺${amount.toLocaleString()}`}
        </p>
        {data.map((item, index) => (
          <Pipeline
            key={index}
            title={item.title}
            company={item.company}
            amount={item.amount}
            owner={item.owner}
            status={item.status}
          />
        ))}
      </div>
    </>
  );
}
