export default function DiagnosticLoading() {
  return (
    <main className="h-svh overflow-hidden bg-[#f7f5f2] md:flex md:items-center md:justify-center md:p-5">
      <div className="mx-auto h-svh w-full md:h-[calc(100svh-40px)] md:max-h-[920px] md:max-w-[860px]">
        <div className="flex h-full min-h-0 w-full items-center justify-center bg-[#eef4ff] font-gotham md:bg-[#f7f5f2]">
          <div className="flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:max-w-[760px] md:rounded-[4px] md:border md:border-[#d8e4f6]">
            <div className="flex h-[52px] shrink-0 items-start bg-white px-8 pt-4 md:h-[58px]">
              <div className="font-gotham text-[29px] font-bold leading-none text-[#0057c8]">BCL</div>
            </div>
            <div className="flex flex-1 items-center justify-center px-8 text-center">
              <div>
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#c7d8f9] border-t-[#0057c8]" />
                <p className="mt-4 font-gotham text-sm font-medium text-[#4b5563]">Loading clarity check...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
