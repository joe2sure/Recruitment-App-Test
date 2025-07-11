import { Body } from '@/components/ui'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'

const donutData = [
  { name: 'Active', value: 50, color: '#22c55e' },
  { name: 'Inactive', value: 38, color: '#8b5cf6' },
  { name: 'Pending', value: 12, color: '#3b82f6' }
]

const lineData = [
  { month: 'Jan', value: 2 },
  { month: 'Mar', value: 8 },
  { month: 'May', value: 12 },
  { month: 'Jul', value: 15 },
  { month: 'Sep', value: 18 },
  { month: 'Nov', value: 20 }
]

const AnalyticsCharts = () => {
  return (
    <div>
      <div className="grid grid-rows-2 gap-5">
        <div className="bg-white border border-gray-200 flex flex-col items-center">
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 h-48 relative">
          <Body className="absolute top-0 left-0 transform -rotate-90">Cresentials</Body>
          {/* grid grid-cols-[20px_1fr] */}
          
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
                ticks={[0, 10, 20, 30]}
                domain={[0, 30]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>

          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsCharts
