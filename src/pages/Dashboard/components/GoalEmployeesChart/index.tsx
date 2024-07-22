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

import { TextInfo } from '@/components/TextInfo'
import { useGoals } from '@/contexts/goals/GoalsContext'

/* const data = [
  {
    name: 'Julia B.',
    uv: 4000,
    Vendas: 2400,
    amt: 2400,
  },
  {
    name: 'Ana S.',
    uv: 3000,
    Vendas: 1398,
    amt: 2210,
  },
  {
    name: 'Marcos A.',
    uv: 2000,
    Vendas: 9800,
    amt: 2290,
  },
  {
    name: 'Victor A.',
    uv: 2780,
    Vendas: 3908,
    amt: 2000,
  },
  {
    name: 'Richard B.',
    uv: 1890,
    Vendas: 4800,
    amt: 2181,
  },
] */

export function GoalEmployeesChart() {
  const { goalEmployeeByMonth } = useGoals()

  const currencyFormatter = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      {goalEmployeeByMonth.length === 0 ? (
        <TextInfo marginTop="2rem" text="Não há informações no período" />
      ) : (
        <BarChart
          width={500}
          height={300}
          data={goalEmployeeByMonth}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
          style={{ fontSize: 12, fontWeight: 500 }}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
            fontSize={12}
            fontWeight={500}
          />
          <YAxis />
          <Tooltip formatter={currencyFormatter} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="metas" fill="#FF9E00" background={{ fill: '#eee' }} />
        </BarChart>
      )}
    </ResponsiveContainer>
  )
}
