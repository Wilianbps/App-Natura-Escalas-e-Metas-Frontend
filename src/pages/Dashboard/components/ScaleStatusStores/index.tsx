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

import { useGoals } from '@/contexts/goals/GoalsContext'

const data = [
  {
    name: 'Lojas finalizadas',
    Quantidade: 50,
  },
  {
    name: 'Lojas Não Finalizadas',
    Quantidade: 50,
  },
  {
    name: 'Lojas Não Geradas',
    Quantidade: 50,
  },
]

export function ScaleStatusStoresChart() {
  const { goalEmployeeByMonth } = useGoals()

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
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
