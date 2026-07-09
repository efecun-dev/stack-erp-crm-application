import React from "react";

export default function MainContainer({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <>
      <main className="w-full flex flex-col gap-3 p-5">{children}</main>
    </>
  );
}
