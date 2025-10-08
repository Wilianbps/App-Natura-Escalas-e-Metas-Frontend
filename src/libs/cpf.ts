export function insertMaskInCpf(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}

export function isValidCpf(cpf: string): boolean {
  const unmasked = cpf.replace(/\D/g, '')

  if (unmasked.length !== 11) return false

  if (/^(\d)\1{10}$/.test(unmasked)) return false

  let sum = 0
  let rest

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(unmasked.substring(i - 1, i)) * (11 - i)
  }
  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(unmasked.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(unmasked.substring(i - 1, i)) * (12 - i)
  }
  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(unmasked.substring(10, 11))) return false

  return true
}
