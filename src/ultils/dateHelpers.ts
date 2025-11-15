export function getCurrentWeekInterval() {
  const now = new Date()
  const firstDayOfWeek = new Date(now)
  firstDayOfWeek.setDate(now.getDate() - now.getDay())
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
  return { start: firstDayOfWeek, end: lastDayOfWeek }
}

export function formatDateToDDMM(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}
