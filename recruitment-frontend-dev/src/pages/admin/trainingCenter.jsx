import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const TrainingCenter = () => {
  return (
    <div className='m-4'>
      <h1 className='text-3xl font-bold text-[#0D141C]'>Training Center</h1>
      <p className='text-sm text-[#4F7594] pl-1'>
        Upload tutorials to train your team
      </p>

      <div className='mt-10 border-b border-b-[#D1DBE5]'>
        <nav className='flex space-x-4'>
          <NavLink
            to='overview'
            className={({ isActive }) =>
              isActive
                ? 'text-[#46007A] font-extrabold pb-2 border-b-4 border-b-[#46007a] text-sm'
                : 'text-[#121417] font-bold pb-2 border-b-4 border-b-[#E5E8EB] text-sm'
            }
          >
            Overview
          </NavLink>
          <NavLink
            to='tutorials'
            className={({ isActive }) =>
              isActive
                ? 'text-[#46007A] font-extrabold pb-2 border-b-4 border-b-[#46007a] text-sm'
                : 'text-[#121417] font-bold pb-2 border-b-4 border-b-[#E5E8EB] text-sm'
            }
          >
            Tutorials
          </NavLink>
        </nav>
      </div>
      <div className='mt-8'>
        <Outlet />
      </div>
    </div>
  );
};

export default TrainingCenter;
