import React from "react";
import DiagnosticClient from "./DiagnosticClient";

export default function DiagnosticPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1280px]">
        <DiagnosticClient />
      </div>
    </main>
  );
}
