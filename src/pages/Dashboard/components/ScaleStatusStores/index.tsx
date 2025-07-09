import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useScales } from '@/contexts/scale/ScalesContext'

export function ScaleStatusStoresChart() {
  const { storesScaleStatus } = useScales()

  const statusCounts = storesScaleStatus.reduce(
    (acc, store) => {
      switch (store.status) {
        case 'ESCALA FINALIZADA':
          acc.finalized += 1
          break
        case 'ESCALA NÃO FINALIZADA':
          acc.notFinalized += 1
          break
        case 'ESCALA NÃO GERADA':
          acc.notGenerated += 1
          break
      }
      return acc
    },
    { finalized: 0, notFinalized: 0, notGenerated: 0 },
  )

  const data = [
    { name: 'Lojas Finalizadas', Quantidade: statusCounts.finalized },
    { name: 'Lojas Não Finalizadas', Quantidade: statusCounts.notFinalized },
    { name: 'Lojas Não Geradas', Quantidade: statusCounts.notGenerated },
  ]

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={50}
        style={{ fontSize: 12, fontWeight: 500 }}
      >
        <XAxis
          dataKey="name"
          scale="point"
          padding={{ left: 24, right: 10 }}
          fontSize={12}
          fontWeight={500}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="Quantidade"
          fill="#FF9E00"
          background={{ fill: '#eee' }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
