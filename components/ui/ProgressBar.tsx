interface Props {
  header?: { title: string; value: number };
  percent: number;
  color: string;
}

export default function ProgressBar({ header, color, percent }: Props) {
  return (
    <>
      <div className="flex flex-col gap-1">
        {header ? (
          <div className="w-full flex justify-between items-center text-xs text-gray-500">
            <p>{header.title}</p>
            <p>{header.value}</p>
          </div>
        ) : (
          ""
        )}
        <div className="w-full h-1.5 rounded-full bg-gray-300/20 relative">
          <div
            style={{ width: percent + "%", backgroundColor: color }}
            className="h-full rounded-full"
          ></div>
        </div>
      </div>
    </>
  );
}
