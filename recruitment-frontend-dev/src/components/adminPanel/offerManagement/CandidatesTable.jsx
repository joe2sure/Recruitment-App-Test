import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const candidates = [
  {
    id: 1,
    role: 'Product Designer',
    candidate: 'Jenny Kim',
    location: 'San Francisco, CA',
    completed: 5,
    total: 10,
    status: 'In progress',
    statusColor: 'bg-[#3D7EFF]'
  },
  {
    id: 2,
    role: 'Software Engineer',
    candidate: 'Nathan Lee',
    location: 'Remote',
    completed: 10,
    total: 10,
    status: 'In progress',
    statusColor: 'bg-[#3D7EFF]'
  },
  {
    id: 3,
    role: 'Data Analyst',
    candidate: 'Sophia Chen',
    location: 'New York, NY',
    completed: 7,
    total: 10,
    status: 'In progress',
    statusColor: 'bg-[#3D7EFF]'
  },
  {
    id: 4,
    role: 'Marketing Manager',
    candidate: 'Ryan Smith',
    location: 'Los Angeles, CA',
    completed: 9,
    total: 10,
    status: 'Rejected',
    statusColor: 'bg-[#FF0000]'
  },
  {
    id: 5,
    role: 'Marketing Manager',
    candidate: 'Ryan Smith',
    location: 'Los Angeles, CA',
    completed: 9,
    total: 10,
    status: 'Accepted',
    statusColor: 'bg-[#008000]'
  },
];

export const CandidatesTable = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Candidates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Candidate</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Details</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Completed</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b border-border hover:bg-accent transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-medium text-foreground">{candidate.role}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-muted-foreground">{candidate.candidate}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-muted-foreground">{candidate.location}</div>
                  </td>
                  <td className="py-4 px-0">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      View details
                    </Button>
                  </td>
                <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                    <Progress
                    value={(candidate.completed / candidate.total) * 100}
                    className="w-20 h-2 bg-gray-200"
                    indicatorClassName={candidate.statusColor} // e.g., "bg-green-500"
                    />

                    <span className="text-sm font-medium text-foreground">
                    {candidate.completed}
                    </span>
                </div>
                </td>
                  <td className="py-4 px-4">
                    <Badge 
                      className={`${candidate.statusColor} text-white hover:${candidate.statusColor}/90`}
                    >
                      {candidate.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
