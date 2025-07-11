import { Outlet } from "react-router-dom";
import Sidebar from "@/components/adminPanel/sideBar";
import Header from "@/components/adminPanel/header";

const AdminLayout = () => {
  return (
    <div className="flex w-full h-screen">
    {/* <div className="flex h-screen overflow-hidden"> */}
      <Sidebar />

      {/* <div className="block min-h-0"> */}
      <div className="flex-1 flex flex-col min-h-0 w-full md:w-[calc(100%-16rem)] lg:w-[calc(100%-16rem)]">
      {/* <div className="flex-1 flex flex-col min-h-0 w-full"> */}
        <Header />

        {/* md:p-10 */} 
        {/* i dont know why this was added but the 24 is better for much padding top */}
        {/* <main className="block bg-[#FFFDF7] px-2 py-4 pt-24"> */}
        <main className="flex-1 overflow-y-auto bg-[#FFFDF7] px-2 py-4 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

    // <div className="flex h-screen flex-col">
    //   <Header />
    //   <div className="flex flex-1 overflow-hidden">
    //     <Sidebar />
    //     <main className="flex-1 overflow-y-auto p-6">
    //       <Outlet />
    //     </main>
    //   </div>
    // </div>
