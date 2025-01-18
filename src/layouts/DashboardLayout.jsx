import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
    return (
        <div>
            <div className="grid grid-cols-5 min-h-screen">
                {/* Sidebar  */}
                <div className="h-screen  sticky top-0">
                    <DashboardSidebar/>
                </div>
                
                {/* Content section  */}
                <main className="col-span-4 mx-10 overflow-y-auto content">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;