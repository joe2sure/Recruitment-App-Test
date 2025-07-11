import { H1, Body } from "@/components/ui"
import { Users } from 'lucide-react'
import  JobPostChart  from '../../components/adminPanel/JobPostChart'
import  AnalyticsCharts  from '../../components/adminPanel/analyticsCharts'
import { JobPostManagementTable, UserManagementTable } from "../../components/adminPanel/managementTable"


const MetricCard = ({ title, value, iconColor }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-3">

        <div className={`p-2 rounded-full flex items-center justify-center ${iconColor}`}>
          <Users className="w-5 h-5 text-white" />
        </div>

        <div>
          <Body className="text-sm font-light text-gray-600 mb-1">{title}</Body>
          <Body className="text-xl font-bold text-blue-600">{value}</Body>
        </div>
      </div>
    </div>
  );
};

const adminDashBoard = () => {
    return(
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 gap-6">
                <MetricCard
                    title="Total user"
                    value="10,825"
                    iconColor="bg-blue-500"
                />
                <MetricCard
                    title="Active Jobs"
                    value="380"
                    iconColor="bg-green-500"
                />
                <MetricCard
                    title="Interview"
                    value="8,972"
                    iconColor="bg-yellow-500"
                />
                <MetricCard
                    title="Total Application"
                    value="8,972"
                    iconColor="bg-orange-500"
                />
                <MetricCard
                    title="Interview Scheduled"
                    value="128"
                    iconColor="bg-green-500"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                <div>
                    <JobPostChart />
                </div>
                <div>
                    <AnalyticsCharts />
                </div>
            </div>

            {/* add tables here */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UserManagementTable />
                <JobPostManagementTable />
            </div>
            
        </div>
    )
}

export default adminDashBoard