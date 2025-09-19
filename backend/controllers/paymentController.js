export const createPayment = async (req, res) => {
  const { amount, bookingId } = req.body;
  if (!amount) return res.status(400).json({ message: "amount required" });
  const ref = "PAY_" + Math.random().toString(36).substring(2,10).toUpperCase();
  res.json({ reference: ref, checkoutUrl: `/api/v1/payment/redirect/${ref}?bookingId=${bookingId||""}` });
};

export const redirectPayment = async (req, res) => {
  const { ref } = req.params;
  const ok = Math.random() < 0.8;
  const status = ok ? "success" : "failure";
  res.redirect(`/payment-result.html?ref=${ref}&status=${status}`);
};
