import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  {
    name: 'Mai',
    hiperMeta: 80000,
    superMeta: 60000,
    meta: 50000,
  },
  {
    name: 'Jun',
    hiperMeta: 90000,
    superMeta: 70000,
    meta: 60000,
  },
  {
    name: 'Jul',
    hiperMeta: 90000,
    superMeta: 70000,
    meta: 60000,
  },
  {
    name: 'Ago',
    hiperMeta: 100000,
    superMeta: 80000,
    meta: 70000,
  },
  {
    name: 'Set',
    hiperMeta: 100000,
    superMeta: 80000,
    meta: 70000,
  },
  {
    name: 'Out',
    hiperMeta: 100000,
    superMeta: 80000,
    meta: 70000,
  },
  {
    name: 'Nov',
    hiperMeta: 120000,
    superMeta: 90000,
    meta: 80000,
  },
  {
    name: 'Dez',
    hiperMeta: 120000,
    superMeta: 90000,
    meta: 80000,
  },
  {
    name: 'Jan',
    hiperMeta: 120000,
    superMeta: 90000,
    meta: 80000,
  },
  {
    name: 'Fev',
    hiperMeta: 130000,
    superMeta: 100000,
    meta: 85000,
  },
  {
    name: 'Mar',
    hiperMeta: 140000,
    superMeta: 110000,
    meta: 90000,
  },
  {
    name: 'Abr',
    hiperMeta: 138000,
    superMeta: 120000,
    meta: 100000,
  },
]

export function AverageSalesMonthChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        width={500}
        height={400}
        data={data}
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
        <Tooltip />
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
