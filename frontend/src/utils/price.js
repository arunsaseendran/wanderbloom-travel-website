export const priceWithDiscount = (price, discountPercent=0) => {
  if (!discountPercent) return { final: price, original: null };
  const final = Math.round(price * (100 - discountPercent) / 100);
  return { final, original: price };
};