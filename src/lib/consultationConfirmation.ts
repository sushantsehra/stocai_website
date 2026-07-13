export const getConsultationConfirmationCopy = (status?: string) => {
  const confirmed = status === "confirmed";
  return {
    confirmed,
    title: confirmed ? "Consultation booked" : "Payment confirmed",
    showCalendarInvite: confirmed,
  };
};
