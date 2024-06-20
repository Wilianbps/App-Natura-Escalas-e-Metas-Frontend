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
    name: '10:00',
    vendas: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '11:00',
    vendas: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '12:00',
    vendas: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '13:00',
    vendas: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '14:00',
    vendas: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '15:00',
    vendas: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '16:00',
    vendas: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '17:00',
    vendas: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '18:00',
    vendas: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '19:00',
    vendas: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '20:00',
    vendas: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '21:00',
    vendas: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '22:00',
    vendas: 3490,
    pv: 4300,
    amt: 2100,
  },
]

export function AverageSalesHourChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
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
        <XAxis dataKey="name" fontSize={12} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="vendas"
          stroke="#FF9E00"
          fill="#FF9E00"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
