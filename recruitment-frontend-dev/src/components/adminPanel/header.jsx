import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { H2 } from "@/components/ui/typography";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Map routes to page titles based on sidebar navigation
  const getPageTitle = (pathname) => {
    const routeMap = {
      "/admin": "Dashboard",
      "/admin/dashboard": "Dashboard",
      "/admin/job-management": "Job Management",
      "/admin/job-management/link-1": "Job Management",
      "/admin/job-applications": "Job Applications",
      "/admin/user-management": "User Management",
      "/admin/offer-management": "Offer Management",
      "/admin/training-center": "Training Center",
      "/admin/communication": "Communication",
      "/admin/payments": "Payments & Billing",
      "/admin/reports": "Reports & Analysis",
      "/admin/system-settings": "System Settings",
      "/admin/security": "Security",
    };

    // Check for exact match first
    if (routeMap[pathname]) {
      return routeMap[pathname];
    }

    // Check for partial matches (for nested routes)
    for (const route in routeMap) {
      if (pathname.startsWith(route)) {
        return routeMap[route];
      }
    }

    // Default fallback - capitalize the pathname
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      return segments[segments.length - 1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return "Dashboard";
  };

  const currentPageTitle = getPageTitle(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      // Get the main content area (the scrollable container)
      const mainContent = document.querySelector(
        'main[class*="overflow-y-auto"]'
      );
      if (mainContent) {
        setIsScrolled(mainContent.scrollTop > 0);
      }
    };

    // Find the scrollable container and add event listener
    const mainContent = document.querySelector(
      'main[class*="overflow-y-auto"]'
    );
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);

      // Cleanup
      return () => {
        mainContent.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <header
      className={`px-4 md:px-10 py-5 flex items-center justify-between fixed top-0 z-10 lg:left-64 w-[calc(100%-0rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-16rem)] transition-colors duration-200 ${
      // className={`px-10 py-5 flex items-center justify-between fixed top-0 z-10 lg:left-64 w-full md:w-[calc(100%-5rem)] lg:w-[calc(100%-16rem)] transition-colors duration-200 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <H2 className="text-purple-950 font-medium text-base md:text-xl hidden md:block">
      {/* <H2 className="text-purple-950 font-medium text-xl"> */}
        {currentPageTitle}
      </H2>

      <div className="flex items-center gap-8">
        <div className="relative">
          <Search
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600"
            size={20}
          />
          <Input
            className="bg-white pl-8 pr-3"
            placeHolder={"Search for anything"}
          />
        </div>

        <div className="flex items-center gap-3  bg-white p-0.5 pr-3 rounded-md cursor-pointer">
          <img
            src="/candidate-pic.png"
            alt="User profile picture"
            className="w-7 h-7 rounded-full object-cover border"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
          <div className="hidden lg:block">
            <p className="text-xs font-semibold text-gray-800">John Mike</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
};
export default Header;
