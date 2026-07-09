import Input from "../ui/Input";
import Button from "../ui/Button";
import { Search, Bell } from "lucide-react";

export default function DashHeader() {
  return (
    <>
      <div className="flex items-center flex-1 py-3 px-6 rounded-xl justify-between bg-white border border-[#D7ECEF]">
        <div className="w-1/3 relative">
          <Input
            type="text"
            name="searchBar"
            placeholder="Müşteri, sipariş, ürün ara..."
            Icon={Search}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button Icon={Bell} type="secondary" />
          <div className="w-10 h-10 font-semibold text-sm rounded-full bg-[#D7EFF2] text-[#007582] flex items-center justify-center">
            ME
          </div>
        </div>
      </div>
    </>
  );
}
