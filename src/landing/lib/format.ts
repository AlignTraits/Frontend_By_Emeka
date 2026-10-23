const nairaNumber = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 });

/** ₦235,000 (naira sign before the amount, commas, no space). */
export function formatNaira(amount: number): string {
  return `₦${nairaNumber.format(amount)}`;
}

/** ₦400k for round thousands (as in the design), otherwise the full amount. */
export function formatNairaShort(amount: number): string {
  return amount >= 1000 && amount % 1000 === 0 ? `₦${amount / 1000}k` : formatNaira(amount);
}
