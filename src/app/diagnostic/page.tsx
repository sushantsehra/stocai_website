import React from "react";
import DiagnosticClient from "./DiagnosticClient";

export default function DiagnosticPage() {
  return (
    <main className="h-svh overflow-hidden bg-[#f7f5f2] md:flex md:items-center md:justify-center md:p-5">
      <div className="mx-auto h-svh w-full md:h-[calc(100svh-40px)] md:max-h-[920px] md:max-w-[860px]">
        <DiagnosticClient />
      </div>
    </main>
  );
}
