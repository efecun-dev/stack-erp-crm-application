interface TaskProps {
  data: {
    title: string;
    completed: boolean;
  }[];
}

export default function Tasks({ data }: TaskProps) {
  return (
    <>
      <div className="flex flex-col gap-0">
        {data.map((item, index) => (
          <div
            key={index}
            className={`${index !== data.length - 1 ? "border-b border-gray-200" : ""} ${item.completed ? "line-through" : ""} text-sm text-gray-500 py-2`}
          >
            {item.title}
          </div>
        ))}
      </div>
    </>
  );
}
