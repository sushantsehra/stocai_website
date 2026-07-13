import { describe, expect, it } from "vitest";

import { getConsultationConfirmationCopy } from "./consultationConfirmation";

describe("getConsultationConfirmationCopy", () => {
  it("only promises a calendar invitation for confirmed bookings", () => {
    expect(getConsultationConfirmationCopy("confirmed")).toEqual({
      confirmed: true,
      title: "Consultation booked",
      showCalendarInvite: true,
    });
  });

  it("acknowledges payment without claiming a booking when rescheduling is needed", () => {
    expect(getConsultationConfirmationCopy("paid_needs_reschedule")).toEqual({
      confirmed: false,
      title: "Payment confirmed",
      showCalendarInvite: false,
    });
  });
});
