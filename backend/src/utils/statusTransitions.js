export const allowedTransitions = {
  Applied: ["Interview", "Rejected"],
  Interview: ["Offer", "Rejected"],
  Offer: ["Rejected"],
  Rejected: []
};

export const isValidTransition = (currentStatus, nextStatus) => {
  return allowedTransitions[currentStatus]?.includes(nextStatus);
};
