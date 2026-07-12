type BoxProps = {
  title: string;
  content: string;
  subtitle: {
    type: "success" | "danger" | "normal";
    text: string;
  };
};

export default function DashInfoBox({
  title,
  content,
  subtitle,
}: Readonly<BoxProps>) {
  return (
    <div className="rounded-xl border border-[#D7ECEF] bg-white p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <h4 className="mt-1 text-2xl font-semibold text-[#0B2E33]">{content}</h4>

      <p
        className={`mt-2 text-sm font-light ${
          subtitle.type === "success"
            ? "text-green-700"
            : subtitle.type === "danger"
              ? "text-red-500"
              : "text-gray-400"
        }`}
      >
        {subtitle.text}
      </p>
    </div>
  );
}
