export function formatOriginalDate(date: Date): Date {
  const adjustedDate = new Date(date)
  adjustedDate.setHours(adjustedDate.getHours() + 3)
  return adjustedDate
}
