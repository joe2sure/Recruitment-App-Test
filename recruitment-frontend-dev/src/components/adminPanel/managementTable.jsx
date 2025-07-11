import { Signal } from 'lucide-react'
import { Body, H3 } from "@/components/ui"
import { useState } from 'react'


// Job Management Table
const JobPostManagementTable = () => {
  const [jobPosts, setJobPosts] = useState(
    [
    {
      id: 1,
      title: 'Registered Nurse',
      employer: 'Healthcorp',
      status: 'Open'
    },
    {
      id: 2,
      title: 'Medical Assistant',
      employer: 'Medsolution',
      status: 'Open'
    },
    {
      id: 3,
      title: 'Nursing Assistant',
      employer: 'Wellness center',
      status: 'Closed'
    },
    {
      id: 4,
      title: 'Pharmacy Technician',
      employer: 'Pharma care',
      status: 'open'
    },
    {
      id: 5,
      title: 'Physical Therapist',
      employer: 'officeplus',
      status: 'Open'
    },
    {
      id: 6,
      title: 'Administrative Assistant',
      employer: 'Officecare',
      status: 'Draft'
    }
    ]
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4">
        <H3 className="text-lg font-semibold text-purple-900">Job post Management</H3>
        <div className="bg-green-600 h-0.5 mt-1.5"></div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium">Title</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Employer</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobPosts.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{job.employer}</td>
                <td className="px-6 py-4">
                  <Body
                    className={
                      job.status.toLowerCase() === 'open' ? ' text-green-800' :
                      job.status.toLowerCase() === 'draft' ? 'text-yellow-300' :
                      ' text-red-800'
                    } 
                    >{job.status}</Body>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// UserManagement Table
const UserManagementTable = () => {
  const [users, setUsers ] = useState(
    [
      {
        id: 1,
        name: 'Theresa Webb',
        role: 'Employer',
        status: 'Active',
        avatar: '/candidate-pic.png',
        trend: 'active'
      },
      {
        id: 2,
        name: 'Floyd Miles',
        role: 'Candidate',
        status: 'Active',
        avatar: '/candidate-pic.png',
        trend: 'active'
      },
      {
        id: 3,
        name: 'Robert Fox',
        role: 'Employer',
        status: 'Active',
        avatar: '/candidate-pic.png',
        trend: 'active'
      },
      {
        id: 4,
        name: 'Annette Black',
        role: 'Suspended',
        status: 'Suspended',
        avatar: '/candidate-pic.png',
        trend: 'supended'
      },
      {
        id: 5,
        name: 'Ralph Edward',
        role: 'Employer',
        status: 'Active',
        avatar: '/candidate-pic.png',
        trend: 'up'
      },
      {
        id: 6,
        name: 'Brooklyn Simm',
        role: 'Candidate',
        status: 'Pending',
        avatar: '/candidate-pic.png',
        trend: 'down'
      },
      {
        id: 7,
        name: 'Brooklyn Simm',
        role: 'Candidate',
        status: 'Pending',
        avatar: '/candidate-pic.png',
        trend: 'up'
      },
      {
        id: 8,
        name: 'Brooklyn Simm',
        role: 'Candidate',
        status: 'Pending',
        avatar: '/candidate-pic.png',
        trend: 'up'
      }
    ]
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <H3 className="text-lg p-3 font-semibold text-purple-900">User Management</H3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="p-2">
                {/* This is just to align the table dont touch it oo */}
              </th>
              <th className="p-2 text-left text-sm font-medium">Name</th>
              <th className="p-2 text-left text-sm font-medium">Role</th>
              <th className="p-2 text-left text-sm font-medium">Status</th>
              <th className="p-2 text-left text-sm font-medium">Activity Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 border rounded-full">
                        <img className="w-8 h-8 object-contain" src={user.avatar} alt="Candidate Profile" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                <td className="px-6 py-4">
                  <Body
                    className={
                      user.status === 'Active' ? ' text-green-800' :
                      user.status === 'Pending' ? 'text-yellow-400' :
                      ' text-red-800'
                    } 
                  >{user.status}</Body>

                </td>
                <td className="px-6 py-4">
                  <Signal className={`
                    ${user.status?.trim().toLowerCase() === 'active' ? 'text-blue-500' : user.status.toLowerCase() === 'pending' ? 'text-yellow-500' : 'text-red-500' }
                    `} />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { JobPostManagementTable, UserManagementTable }
