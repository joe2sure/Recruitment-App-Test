import { Card, CardContent } from "@/components/ui/card";
import { BarChart, FileText, Briefcase, Users } from "lucide-react";

export function MetricCards() {
  const cards = [
    {
      title: "Total job post",
      value: "85",
      icon: <Briefcase className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Open job",
      value: "24",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      color: "bg-green-50",
    },
    {
      title: "Total Application",
      value: "1,972",
      icon: <BarChart className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-50",
    },
    {
      title: "Candidates Hired",
      value: "128",
      icon: <Users className="h-6 w-6 text-teal-500" />,
      color: "bg-teal-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-full ${card.color}`}>{card.icon}</div>
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
