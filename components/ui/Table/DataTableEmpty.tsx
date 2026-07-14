interface Props {
  colSpan: number;
}

export default function DataTableEmpty({ colSpan }: Props) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-14 text-center text-[#8FA8AB]">
        Kayıt bulunamadı.
      </td>
    </tr>
  );
}
