import { firstLetters } from "@/src/utils/firstLetter";

type PipelineProps = {
  title: string;
  company: string;
  amount: number;
  owner: string;
  status: string;
};

export default function Pipeline({
  title,
  company,
  amount,
  owner,
  status,
}: PipelineProps) {
  return (
    <>
      <div className="bg-[#F4FAFB] p-3 flex flex-col gap-1 rounded-xl border border-[#D7ECEF]">
        <h5 className="text-[#0B2E33] text-sm font-semibold">{title}</h5>
        <p className="text-xs text-gray-500">{company}</p>
        <div className="flex justify-between items-stretch">
          <div className="flex flex-col gap-2">
            <p className="text-[#08525A] text-sm font-semibold">{`₺${amount.toLocaleString()}`}</p>
            <div className="w-7 h-7 rounded-full bg-[#E3F6F8] text-[#08525A] flex items-center justify-center text-xs font-semibold">
              {firstLetters(owner)}
            </div>
          </div>
          <div className="flex items-end ">
            <p className="text-sm text-gray-500">
              {status == "discuss"
                ? "%20"
                : status == "offered"
                  ? "%50"
                  : status == "won"
                    ? "%100"
                    : status == "lost"
                      ? "0%"
                      : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
