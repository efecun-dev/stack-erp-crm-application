type BoxProps = {
  title: string;
  content: string;
  subtitle: { type: "success" | "danger" | "normal"; text: string };
};

export default function DashInfoBox({ title, content, subtitle }: BoxProps) {
  return (
    <>
      <div className="p-5 flex w-full flex-col gap-1 bg-white border border-[#D7ECEF] rounded-xl">
        <p className="text-sm text-gray-500">{title}</p>
        <h4 className="text-2xl text-[#0B2E33] font-semibold">{content}</h4>
        <p
          className={`text-sm font-light ${subtitle.type == "success" ? "text-green-700" : subtitle.type == "danger" ? "text-red-400" : subtitle.type == "normal" ? "text-gray-400" : ""}`}
        >
          {subtitle.text}
        </p>
      </div>
    </>
  );
}
