import React from "react";

export default function MainContainer({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <>
      {/* w-full yerine flex-1 kullanıldı */}
      <main className="min-w-0 flex-1 flex flex-col gap-8 p-5 ml-80 max-lg:ml-20">
        {children}
      </main>
    </>
  );
}
