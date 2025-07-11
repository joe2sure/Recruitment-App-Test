// import React from "react";
// import {
//   Handshake,
//   User,
//   Users,
//   Settings,
//   MessageSquareText,
//   HelpCircle,
//   Menu,
//   LogOut,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// const navItems = [
//   { name: "Dashboard", icon: <Handshake size={20} />, path: "/employer" },
//   {
//     name: "Messages",
//     icon: <MessageSquareText size={20} />,
//     path: "/employer/messages",
//   },
//   {
//     name: "Client Profile",
//     icon: <User size={20} />,
//     path: "/employer/clientprofile",
//   },
//   {
//     name: "All Applicants",
//     icon: <Users size={20} />,
//     path: "/employer/allapplicants",
//   },
//   {
//     name: "Joblisting",
//     icon: <Menu size={20} />,
//     path: "/employer/joblisting",
//   },
//   {
//     name: "Settings",
//     icon: <Settings size={20} />,
//     path: "/employer/settings",
//   },
//   {
//     name: "HelpCenter",
//     icon: <HelpCircle size={20} />,
//     path: "/employer/helpCenter",
//   },
// ];

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <aside className="hidden md:flex w-20 lg:w-64 md:flex-col bg-white  transition-all duration-300 overflow-hidden">
//       <nav className="flex flex-col gap-4 p-4">
//         <div className="flex items-center gap-3 mt-4 w-10 h-10 mb-4 cursor-pointer border-2 rounded-full ">
//           <img
//             src="/candidate-pic.png"
//             alt="User picture"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div className="hidden lg:block">
//             <p className="text-sm font-semibold text-gray-800">John Doe</p>
//             <p className="text-xs text-gray-500">johndoe@email.com</p>
//           </div>
//         </div>

//         {navItems.map((item) => {
//           let isActive = false;

//           if (item.name === "Dashboard") {
//             isActive =
//               location.pathname.startsWith("/employer/dashboard") ||
//               location.pathname === "/employer";
//           } else {
//             isActive = location.pathname === item.path;
//           }

//           return (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               className={`flex items-center gap-3 p-2 rounded-md hover:bg-secondary-500 text-sm font-medium transition-colors duration-200 ${
//                 isActive ? "bg-secondary-300" : ""
//               }`}
//             >
//               <div>{item.icon}</div>
//               <span className="hidden lg:inline">{item.name}</span>
//             </NavLink>
//           );
//         })}

//         <button className="flex items-center font-medium hover:bg-secondary-500 gap-3 p-2 text-sm cursor-pointer">
//           <LogOut size={20} />
//           <span className="hidden lg:inline">Logout</span>
//         </button>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import React from "react";
import {
  Handshake,
  User,
  Users,
  Settings,
  MessageSquareText,
  HelpCircle,
  Menu,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: <Handshake size={20} />, path: "/employer" },
  {
    name: "Messages",
    icon: <MessageSquareText size={20} />,
    path: "/employer/messages",
  },
  {
    name: "Client Profile",
    icon: <User size={20} />,
    path: "/employer/clientprofile",
  },
  {
    name: "All Applicants",
    icon: <Users size={20} />,
    path: "/employer/allapplicants",
  },
  {
    name: "Joblisting",
    icon: <Menu size={20} />,
    path: "/employer/joblisting",
  },
  {
    name: "Settings",
    icon: <Settings size={20} />,
    path: "/employer/settings",
  },
  {
    name: "HelpCenter",
    icon: <HelpCircle size={20} />,
    path: "/employer/helpcenter",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear authentication tokens
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userProfile");

      // Clear session storage
      sessionStorage.clear();

      // Optional: Call logout API endpoint
      // await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });

      // Redirect to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if logout API fails
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside className="hidden md:flex w-20 lg:w-64 md:flex-col bg-white transition-all duration-300 overflow-hidden">
      <nav
        className="flex flex-col gap-4 p-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3 mt-4 w-10 h-10 mb-4 cursor-pointer border-2 rounded-full">
          <img
            src="/candidate-pic.png"
            alt="User profile picture"
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">johndoe@email.com</p>
          </div>
        </div>

        {navItems.map((item) => {
          let isActive = false;

          if (item.name === "Dashboard") {
            isActive =
              location.pathname.startsWith("/employer/dashboard") ||
              location.pathname === "/employer";
          } else {
            isActive = location.pathname === item.path;
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-secondary-500 text-sm font-medium transition-colors duration-200 ${
                isActive ? "bg-secondary-300" : ""
              }`}
              aria-label={`Navigate to ${item.name}`}
              title={item.name}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="hidden lg:inline truncate">{item.name}</span>
            </NavLink>
          );
        })}

        <button
          className="flex items-center font-medium hover:bg-secondary-500 gap-3 p-2 text-sm cursor-pointer rounded-md transition-colors duration-200"
          onClick={handleLogout}
          aria-label="Logout from application"
          title="Logout"
        >
          <div className="flex-shrink-0">
            <LogOut size={20} />
          </div>
          <span className="hidden lg:inline">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
