import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
    return (
        <div>
            <div className="grid grid-cols-5 min-h-screen">
                <DashboardSidebar/>
                
                {/* Content section  */}
                <main className="col-span-4 mx-10 ">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;