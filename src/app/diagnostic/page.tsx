import React from "react";
import DiagnosticClient from "./DiagnosticClient";

export default function DiagnosticPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[#f7f5f2] p-3 md:flex md:items-center md:justify-center md:p-5">
      <div className="mx-auto h-[calc(100svh-24px)] w-full max-w-[860px] md:h-[calc(100svh-40px)] md:max-h-[920px]">
        <DiagnosticClient />
      </div>
    </main>
  );
}
