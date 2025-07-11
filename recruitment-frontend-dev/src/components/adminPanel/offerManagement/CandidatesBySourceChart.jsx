import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: 'In Progress', value: 45, color: '#3D7EFF' },
  { name: 'Accepted', value: 25, color: '#008000' },
  { name: 'Rejected', value: 18, color: '#FF0000' },
  // { name: 'Other', value: 12, color: '#6B7280' },
];

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-col space-y-2 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center md:items-start space-x-2">
          <div 
            className="w-3 lg:w-2 h-3 lg:h-2 rounded-full flex md:mt-1.5" 
            style={{ backgroundColor: entry.color }}
          />

          <div className='flex w-full md:flex-col lg:flex-col xl:flex-row text-start justify-start items-start'>
          <span className="text-sm text-muted-foreground">{entry.value}</span>
          <span className="text-sm font-medium ml-6 md:ml-0 xl:ml-auto">
            {data.find(d => d.name === entry.value)?.value}%
          </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CandidatesBySourceChart = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Candidates by Source</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col md:flex-row items-center md:h-64">
          <div className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/2 px-4 md:px-12 lg:px-2 xl:px-4">
            <CustomLegend payload={data.map(d => ({ color: d.color, value: d.name }))} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};