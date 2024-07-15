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
    name: 'Seg',
    vendas: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Ter',
    vendas: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Qua',
    vendas: -1000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Qui',
    vendas: 500,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Sex',
    vendas: -2000,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Sáb',
    vendas: -250,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Dom',
    vendas: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.vendas))
  const dataMin = Math.min(...data.map((i) => i.vendas))

  if (dataMax <= 0) {
    return 0
  }
  if (dataMin >= 0) {
    return 1
  }

  return dataMax / (dataMax - dataMin)
}

const off = gradientOffset()

export function AverageSalesDayChart() {
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
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#FF9E00" stopOpacity={1} />
            <stop offset={off} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="vendas"
          stroke="#000"
          fill="url(#splitColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
