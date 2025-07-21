// src/constants/positions.ts
export const positions = [
  'Apoio',
  'Estoquista',
  'Gerente',
  'Jovem aprendiz',
  'Vendedor',
  'VR'
] as const

export type PositionType = (typeof positions)[number] // Tipo dos valores no array
