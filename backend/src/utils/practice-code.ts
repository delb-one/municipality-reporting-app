export function buildPracticeCode(
  createdAt: Date,
  sequence: number,
): string {
  const year = createdAt.getFullYear();
  const padded = String(sequence).padStart(6, '0');

  return `SEG-${year}-${padded}`;
}
