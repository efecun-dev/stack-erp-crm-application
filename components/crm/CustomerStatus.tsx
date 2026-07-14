type StatusProps = {
  status: string;
};

export default function CustomerStatus({ status }: StatusProps) {
  return (
    <>
      <div
        className={`px-2 py-1 w-fit flex items-center justify-center text-nowrap text-xs rounded-md ${status == "active" ? "bg-[#EAF3DE] text-[#27500A]" : status == "potential" ? "bg-[#E3F6F8] text-[#08525A]" : status == "negotiation" ? "bg-[#FAEEDA] text-[#633806]" : status == "passive" ? "bg-[#FBE7E1] text-[#8A2E17]" : ""}`}
      >
        {status == "active"
          ? "Aktif"
          : status == "potential"
            ? "Potansiyel"
            : status == "negotiation"
              ? "Görüşme aşamasında"
              : status == "passive"
                ? "Pasif"
                : ""}
      </div>
    </>
  );
}
