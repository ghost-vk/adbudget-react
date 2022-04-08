export const toPercent = (num) => {
  if (!Number(num)) return ''

  return num > 1 ? `${num}%` : `${num * 100}%`
}
