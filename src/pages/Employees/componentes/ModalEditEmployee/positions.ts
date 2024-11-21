// src/constants/positions.ts
export const positions = ['Apoio', 'VR', 'Estoquista', 'Vendedor'] as const

export type PositionType = (typeof positions)[number] // Tipo dos valores no array
