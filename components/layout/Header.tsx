import Input from "../ui/Input";
import Button from "../ui/Button";
import { Search, Bell } from "lucide-react";

type HeaderProps = {
  searchPlaceholder: string;
};

export default function Header({ searchPlaceholder }: HeaderProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#D7ECEF] bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:p-3">
      <div className="w-full sm:w-80 lg:w-96">
        <Input
          type="text"
          name="searchBar"
          placeholder={searchPlaceholder}
          Icon={Search}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button Icon={Bell} variant="secondary" />

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D7EFF2] text-sm font-semibold text-[#007582]">
          ME
        </div>
      </div>
    </div>
  );
}
