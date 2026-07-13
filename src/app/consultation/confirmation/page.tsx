"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import env from "@/utils/env";
import { getConsultationConfirmationCopy } from "@/lib/consultationConfirmation";

type Booking = { status?: string; slot_start?: string; calendar_link?: string; detail?: string };

function ConsultationConfirmationContent() {
  const params = useSearchParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const confirmationCopy = getConsultationConfirmationCopy(booking?.status);

  useEffect(() => {
    const payload = {
      payment_link_id: params.get("razorpay_payment_link_id"),
      payment_link_reference_id: params.get("razorpay_payment_link_reference_id"),
      payment_link_status: params.get("razorpay_payment_link_status"),
      payment_id: params.get("razorpay_payment_id"),
      signature: params.get("razorpay_signature"),
    };
    if (Object.values(payload).some((value) => !value)) {
      setError("The payment confirmation details are incomplete.");
      return;
    }
    fetch(`${env.apiUrl}/consultations/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data?.detail || "Payment verification failed.");
        setBooking(data);
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : "Payment verification failed."));
  }, [params]);

  useEffect(() => {
    if (booking?.status !== "confirmed") return;
    const redirectTimer = window.setTimeout(() => {
      window.location.assign("/");
    }, 5000);
    return () => window.clearTimeout(redirectTimer);
  }, [booking?.status]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fc] px-5 py-12 font-jakarta">
      <section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:p-12">
        {!booking && !error ? <p className="text-[#526177]">Confirming your consultation payment…</p> : null}
        {error ? <><h1 className="text-2xl font-bold text-[#b42318]">We couldn&apos;t confirm the booking</h1><p className="mt-3 text-[#667085]">{error}</p></> : null}
        {booking ? (
          <>
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${confirmationCopy.confirmed ? "bg-[#eaf2ff] text-[#075ff0]" : "bg-amber-50 text-amber-700"}`}>✓</div>
            <h1 className={`mt-5 text-3xl font-bold ${confirmationCopy.confirmed ? "text-[#075ff0]" : "text-amber-800"}`}>
              {confirmationCopy.title}
            </h1>
            {booking.slot_start ? <p className="mt-4 text-lg font-semibold text-[#232323]">{new Intl.DateTimeFormat("en-IN", { dateStyle: "full", timeStyle: "short" }).format(new Date(booking.slot_start))}</p> : null}
            {confirmationCopy.showCalendarInvite ? <p className="mt-3 text-[#667085]">A calendar invitation has been sent to your email.</p> : null}
            {booking.calendar_link ? <a href={booking.calendar_link} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-lg bg-[#075ff0] px-6 py-3 font-semibold text-white">Open calendar event</a> : null}
            {booking.status === "paid_needs_reschedule" ? <p className="mt-5 rounded-lg bg-amber-50 p-4 text-amber-800">Your payment is confirmed, but the selected slot was taken. Our team will contact you to choose another time.</p> : null}
          </>
        ) : null}
      </section>
    </main>
  );
}

export default function ConsultationConfirmationPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-[#f4f7fc]">Confirming your consultation payment…</main>}>
      <ConsultationConfirmationContent />
    </Suspense>
  );
}
