import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import your Sidebar component

const AdminLayout = () => {
  return (
    <>
      <h2 className="w-fit flex rounded-md shadow-lg items-center justify-center mx-auto text-center md:text-3xl text-2xl bg-black text-white p-4  font-semibold">
        Admin Dashbaord
      </h2>
      <div className="w-full mt-8 flex min-h-screen flex-row gap-4">
        <div className="md:w-[25%] w-[10%] border-t border-r">
          <Sidebar />
        </div>

        <div className="w-full border-t ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
