const TAX_RATE = 0.18;

export function calculateCheckoutTotals(subtotal: number) {
  const tax = Math.round(subtotal * TAX_RATE);

  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
}
