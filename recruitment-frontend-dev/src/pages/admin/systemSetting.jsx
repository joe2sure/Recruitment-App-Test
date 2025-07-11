import { NavLink, Outlet } from 'react-router-dom';

const tabLinks = [
  {
    name: 'General',
    link: '/admin/system-settings',
  },
  {
    name: 'Configuration',
    link: '',
  },
  {
    name: 'Notifications',
    link: '',
  },
  {
    name: 'Payments',
    link: '',
  },
  {
    name: 'Integration',
    link: '',
  },
];

const SystemSetting = () => {
  return (
    // <>
    <div className='bg-[#F9F9FA] p-4 md:p-3 m-4'>
      <nav className='flex sm:justify-between sm:px-4 flex-wrap gap-y-2 gap-x-3'>
        {tabLinks.map(({ link, name }) => (
          <NavLink
            to={link || '/admin'}
            end
            className={({ isActive }) =>
              `pb-1 w-[30%] sm:w-1/6 lg:w-[13%] text-center font-semibold md:text-lg ${
                isActive
                  ? 'text-[#46007A] border-b-2 border-b-[#46007a]'
                  : 'text-[#D6C3E9]'
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>
      <div className='mt-8'>
        <Outlet />
      </div>
    </div>
    // </>
  );
};

export default SystemSetting;
