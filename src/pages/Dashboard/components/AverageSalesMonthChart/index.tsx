import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useGoals } from '@/contexts/goals/GoalsContext'

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function AverageSalesMonthChart() {
  const { rankingGoalsLastTwelveMonths } = useGoals()
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        width={500}
        height={400}
        data={rankingGoalsLastTwelveMonths}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        style={{ fontSize: 12, fontWeight: 500 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          itemStyle={{ color: 'black' }}
          formatter={(value: number) => formatCurrency(value)}
        />
        <Area
          type="monotone"
          dataKey="hiperMeta"
          stackId="1"
          stroke="#FFBE53"
          fill="#FFBE53"
        />
        <Area
          type="monotone"
          dataKey="superMeta"
          stackId="2"
          stroke="#ffbbaa"
          fill="#ffbbaa"
        />
        <Area
          type="monotone"
          dataKey="meta"
          stackId="3"
          stroke="#fff7eb"
          fill="#fff7eb"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
