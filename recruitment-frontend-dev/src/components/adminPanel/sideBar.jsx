import {
  LayoutDashboard,
  User,
  Gift,
  MessageCircle,
  CreditCard,
  BarChart2,
  Settings,
  Shield,
  ChevronDown,
  Component,
  HandHelping,
  Network,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, children }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(children);

  return (
    <div>
      <div
        onClick={() => hasChildren && setOpen(!open)}
        className="flex items-center justify-between gap-3 p-2 text-white hover:bg-purple-700 cursor-pointer transition-color"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5" />}
          <span className="hidden lg:block text-sm font-medium">{label}</span>
        </div>
        {hasChildren && (
          <ChevronDown
            className={`w-4 h-4 transform transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
      {open && children && (
        <div className="ml-8 mt-1 flex flex-col gap-1">{children}</div>
      )}
    </div>
  );
};

const SidebarLink = ({ label, linkTo }) => (
  <NavLink
    to={linkTo}
    className="text-white text-sm pl-2 py-1 hover:underline cursor-pointer"
  >
    {label}
  </NavLink>
);

const Sidebar = () => {
  return (
    <aside className=" hidden lg:w-64 h-screen bg-purple-950 text-white p-4 pb-15  md:flex md:w-20  flex-col overflow-y-auto [&::-webkit-scrollbar]:w-0 scrollbar-none">
      <div className="h-22 w-22 item p-2 my-7 self-center lg:w-26 lg:h-26 lg:p-0 lg:mt-0">
        <img className="max-w-full" src="/logo.png" alt="Logo" />
      </div>

      <nav className="flex flex-col gap-3">
        <NavLink to="/admin">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" />
        </NavLink>

        {/* <SidebarItem
          linkTo={"/admin/job-management"}
          icon={Network}
          label='Job Management'
        >
          <SidebarLink
            linkTo={'/admin/job-management/link-1'}
            label='Inner Link'
          />
          <SidebarLink label="Inner Link 2" />
        </SidebarItem> */}

        <NavLink to="/admin/job-management">
          <SidebarItem icon={Network} label="Job Management" />
        </NavLink>

        <NavLink to="/admin/job-applications">
          <SidebarItem icon={Component} label="Job Applications" />
        </NavLink>
        {/* <SidebarItem icon={User} label="User Management">
          <SidebarLink linkTo={"/admin/user-management/userManagement"} label="User Management" />
          <SidebarLink label="Inner Link 2" />
        </SidebarItem> */}

        <NavLink to="/admin/user-management">
          <SidebarItem icon={User} label="User Management" />
        </NavLink>
        <NavLink to="/admin/offer-management">
          <SidebarItem icon={Gift} label="Offer-Management" />
        </NavLink>
        {/* <SidebarItem icon={Gift} label="Offer Management">
          <SidebarLink label="Inner Link" />
          <SidebarLink label="Inner Link 2" />
        </SidebarItem> */}

        <SidebarItem icon={HandHelping} label="Training Center">
          <SidebarLink
            label="Overview"
            linkTo={"/admin/training-center/overview"}
          />
          <SidebarLink
            label="Tutorials"
            linkTo={"/admin/training-center/tutorials"}
          />
        </SidebarItem>

        <NavLink to="/admin/communication">
          <SidebarItem icon={MessageCircle} label="Communication" />
        </NavLink>
        {/* <SidebarItem icon={MessageCircle} label="Communication">
          <SidebarLink label="Inner Link" />
          <SidebarLink label="Inner Link 2" />
        </SidebarItem> */}
        <NavLink to="/admin/payments">
          <SidebarItem icon={CreditCard} label="Payments & Billing" />
        </NavLink>
        {/* <SidebarItem icon={CreditCard} label='Payments & Billing'>
          <SidebarLink label='Inner Link' />
          <SidebarLink label='Inner Link 2' />
        </SidebarItem> */}

        <NavLink to="/admin/reports">
          <SidebarItem icon={BarChart2} label="Reports & Analysis" />
        </NavLink>
        {/* <SidebarItem icon={BarChart2} label="Reports & Analytics">
          <SidebarLink label="Inner Link" />
          <SidebarLink label="Inner Link 2" />
        </SidebarItem> */}

        <SidebarItem icon={Settings} label="System Settings">
          <SidebarLink label="General" linkTo="/admin/system-settings" />
          {/* <SidebarLink label='Inner Link 2' /> */}
        </SidebarItem>

        <NavLink to="/admin/security">
          <SidebarItem icon={Shield} label="Security" />
        </NavLink>
        {/* <SidebarItem icon={Shield} label="Security">
          <SidebarLink label="Inner Link" />
          <SidebarLink label="Inner Link 2" />
        </SidebarItem> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
