import React from "react";
import DiagnosticClient from "./DiagnosticClient";

export default function DiagnosticPage() {
  return (
    <main className="h-svh overflow-hidden bg-white p-2 md:p-3">
      <div className="mx-auto h-full max-w-[1400px]">
        <DiagnosticClient />
      </div>
    </main>
  );
}
