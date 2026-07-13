type BarProps = {
  status: string;
};

export default function StatusBar({ status }: BarProps) {
  return (
    <>
      <span
        className={`px-2 py-1 text-xs rounded-xl font-semibold ${
          status == "shipping"
            ? "bg-[#E3F6F8] text-[#08525A]"
            : status == "delivered"
              ? "bg-[#EAF3DE] text-[#27500A]"
              : status == "preparing"
                ? "bg-[#FAEEDA] text-[#633806]"
                : ""
        }`}
      >
        {status == "shipping"
          ? "Kargoda"
          : status == "delivered"
            ? "Teslim Edildi"
            : status == "preparing"
              ? "Hazırlanıyor"
              : ""}
      </span>
    </>
  );
}
