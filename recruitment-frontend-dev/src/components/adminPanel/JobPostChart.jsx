import { useState } from 'react'
import { Button } from '@/components/ui';
import { H3 } from '@/components/ui';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'


const JobPostChart = () => {
  const [data,setData] = useState([
    { month: 'Jan', weekly: 8500, monthly: 5000, yearly: 6500 },
    { month: 'Feb', weekly: 9800, monthly: 7200, yearly: 6300 },
    { month: 'Mar', weekly: 8300, monthly: 9500, yearly: 5200 },
    { month: 'Apr', weekly: 9900, monthly: 7500, yearly: 8700 },
    { month: 'May', weekly: 8500, monthly: 6800, yearly: 6200 },
    { month: 'Jun', weekly: 8500, monthly: 9600, yearly: 6300 },
    { month: 'Jul', weekly: 1800, monthly: 9500, yearly: 6200 }
    ])

  const [selectedPeriods, setSelectedPeriods] = useState({
    weekly: true,
    monthly: true,
    yearly: true
  })

  const togglePeriod = (period) => {
    setSelectedPeriods((prev) => ({
      ...prev,
      [period]: !prev[period]
    }));
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <H3 className="font-bold text-purple-900">Job post</H3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => togglePeriod('weekly')}
            className={`flex items-center text-sm ${selectedPeriods.weekly ? 'text-yellow-600' : 'text-gray-400'}`}
          >
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            Weekly
          </button>
          <button
            onClick={() => togglePeriod('monthly')}
            className={`flex items-center text-sm ${selectedPeriods.monthly ? 'text-red-600' : 'text-gray-400'}`}
          >
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            Monthly
          </button>
          <button
            onClick={() => togglePeriod('yearly')}
            className={`flex items-center text-sm ${selectedPeriods.yearly ? 'text-purple-600' : 'text-gray-400'}`}
          >
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            Yearly
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000]}
              tick={{ fontSize: 12, fill: '#666' }}
              domain={[0, 12000]}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            {selectedPeriods.weekly && (
              <Bar dataKey="weekly" fill="#22c55e" radius={[2, 2, 0, 0]} />
            )}
            {selectedPeriods.monthly && (
              <Bar dataKey="monthly" fill="#ef4444" radius={[2, 2, 0, 0]} />
            )}
            {selectedPeriods.yearly && (
              <Bar dataKey="yearly" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default JobPostChart