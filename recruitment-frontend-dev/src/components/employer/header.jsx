import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 lg:px-6 py-2 bg-white shadow-md border-b">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="h-12 w-12 flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="Company Logo"
            className="h-full w-full object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback logo */}
          <div className="hidden h-12 w-12 bg-blue-600 rounded-lg items-center justify-center text-white font-bold text-lg">
            L
          </div>
        </div>
      </div>

      {/* Right Section - Search, Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden sm:flex relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="bg-secondary-300 w-64 pl-10 pr-4 py-2 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Post Job Button */}
        <Button
          onClick={() => navigate("dashboard/post-job")}
          size="default"
          className="bg-purple-950 text-white px-4 py-2 text-sm cursor-pointer font-medium rounded-lg transition-colors"
        >
          Post a job
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-full cursor-pointer bg-purple-300 transition-colors relative"
        >
          <Bell size={20} className="text-gray-600" />
          {/* Optional notification badge */}
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-950 rounded-full"></span>
        </Button>

        {/* Mobile Menu - Only visible on mobile */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </Button>
      </div>
    </header>
  );
};

export default Header;

// import { Bell, Search, Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate, NavLink, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   Handshake,
//   User,
//   Users,
//   Settings,
//   MessageSquareText,
//   HelpCircle,
//   LogOut,
// } from "lucide-react";

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
//     path: "/employer/helpcenter",
//   },
// ];

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMobileMenuOpen]);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen]);

//   const handleLogout = async () => {
//     try {
//       // Clear authentication tokens
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("userProfile");

//       // Clear session storage
//       sessionStorage.clear();

//       // Optional: Call logout API endpoint
//       // await fetch('/api/auth/logout', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//       //   }
//       // });

//       // Redirect to login page
//       navigate("/login", { replace: true });
//     } catch (error) {
//       console.error("Logout error:", error);
//       // Still redirect even if logout API fails
//       navigate("/login", { replace: true });
//     }
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-50 flex items-center justify-between px-4 lg:px-6 py-2 bg-white shadow-md border-b">
//         {/* Logo Section */}
//         <div className="flex items-center">
//           <div className="h-12 w-12 flex items-center justify-center">
//             <img
//               src="/logo.svg"
//               alt="Company Logo"
//               className="h-full w-full object-contain"
//               onError={(e) => {
//                 e.target.style.display = "none";
//                 e.target.nextSibling.style.display = "flex";
//               }}
//             />
//             {/* Fallback logo */}
//             <div className="hidden h-12 w-12 bg-blue-600 rounded-lg items-center justify-center text-white font-bold text-lg">
//               L
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Search, Actions */}
//         <div className="flex items-center gap-3 md:gap-4">
//           {/* Search Bar - Hidden on mobile */}
//           <div className="hidden sm:flex relative">
//             <Search
//               size={16}
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-secondary-300 w-64 pl-10 pr-4 py-2 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//             />
//           </div>

//           {/* Post Job Button */}
//           <Button
//             onClick={() => navigate("dashboard/post-job")}
//             size="default"
//             className="bg-purple-950 text-white px-4 py-2 text-sm cursor-pointer font-medium rounded-lg transition-colors hover:bg-purple-900"
//           >
//             Post a job
//           </Button>

//           {/* Notifications */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="p-2 rounded-full cursor-pointer bg-purple-300 transition-colors relative hover:bg-purple-400"
//             aria-label="View notifications"
//           >
//             <Bell size={20} className="text-gray-600" />
//             {/* Optional notification badge */}
//             <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-950 rounded-full"></span>
//           </Button>

//           {/* Mobile Menu - Only visible on mobile */}
//           <Button
//             variant="ghost"
//             size="icon"
//             aria-label="Toggle menu"
//             className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
//             onClick={toggleMobileMenu}
//           >
//             {isMobileMenuOpen ? (
//               <X size={20} className="text-gray-600" />
//             ) : (
//               <Menu size={20} className="text-gray-600" />
//             )}
//           </Button>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-5 md:hidden">
//           {/* Backdrop */}
//           <div className="fixed inset-0 bg-transparent bg-opacity-50 transition-opacity" />

//           {/* Mobile Menu */}
//           <div className="mobile-menu-container fixed top-0 left-0 h-full w-18 bg-white shadow-sm transform transition-transform duration-300 ease-in-out">
//             <div className="flex flex-col h-full">
//               {/* Header */}
//               <div className="flex items-center justify-between p-4">
//                 <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={toggleMobileMenu}
//                   className="p-2 rounded-full hover:bg-gray-100"
//                   aria-label="Close menu"
//                 >
//                   <X size={20} className="text-gray-600" />
//                 </Button>
//               </div>

//               {/* User Profile */}
//               <div className="flex items-center gap-2 p-4 bg-gray-50">
//                 <img
//                   src="/candidate-pic.png"
//                   alt="User profile picture"
//                   className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
//                   onError={(e) => {
//                     e.target.src = "/default-avatar.png";
//                   }}
//                 />
//                 {/* <div>
//                   <p className="text-sm font-semibold text-gray-800">
//                     John Doe
//                   </p>
//                   <p className="text-xs text-gray-500">johndoe@email.com</p>
//                 </div> */}
//               </div>

//               {/* Navigation Items */}
//               <nav
//                 className="flex-1  p-2"
//                 role="navigation"
//                 aria-label="Mobile navigation"
//               >
//                 <div className="space-y-2">
//                   {navItems.map((item) => {
//                     let isActive = false;

//                     if (item.name === "Dashboard") {
//                       isActive =
//                         location.pathname.startsWith("/employer/dashboard") ||
//                         location.pathname === "/employer";
//                     } else {
//                       isActive = location.pathname === item.path;
//                     }

//                     return (
//                       <NavLink
//                         key={item.name}
//                         to={item.path}
//                         className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors duration-200 ${
//                           isActive
//                             ? "bg-purple-100 text-purple-700 border-l-4 border-purple-700"
//                             : "text-gray-700"
//                         }`}
//                         aria-label={`Navigate to ${item.name}`}
//                       >
//                         <div className="flex-shrink-0">{item.icon}</div>
//                         <span className="truncate">{item.name}</span>
//                       </NavLink>
//                     );
//                   })}
//                 </div>
//               </nav>

//               {/* Logout Button */}
//               <div className="p-4 border-t">
//                 <button
//                   className="flex items-center gap-4 p-3 w-full text-left rounded-lg hover:bg-red-50 text-sm font-medium text-red-600 transition-colors duration-200"
//                   onClick={handleLogout}
//                   aria-label="Logout from application"
//                 >
//                   <div className="flex-shrink-0">
//                     <LogOut size={20} />
//                   </div>
//                   {/* <span>Logout</span> */}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;
