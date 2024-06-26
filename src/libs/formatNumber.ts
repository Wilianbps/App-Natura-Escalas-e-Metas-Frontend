export function formatNumber(value: number) {
  const currencyFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const formatValue = currencyFormat.format(value)

  return formatValue
}
