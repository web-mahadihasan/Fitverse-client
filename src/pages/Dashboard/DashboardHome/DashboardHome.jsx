import useAdmin from "../../../hooks/useAdmin";
import AdminDashboard from "./AdminDashboard";
import useAuth from "../../../hooks/useAuth";
import useTrainer from "../../../hooks/useTrainer";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
    const [isAdmin] = useAdmin()
    const [isTrainer] = useTrainer()
    const {user} = useAuth()

    return (
        <div>
            {
                isAdmin && <AdminDashboard/>
            }
            {
                isTrainer && <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center text-center flex-col">
                    <h3 className="text-2xl md:text-5xl font-bold font-kanit">Welcome Back, <span className="text-main">{user?.displayName}</span></h3>
                    <h3 className="text-2xl md:text-4xl capitalize my-6 font-semibold font-kanit">Explorer your amazing dashboard</h3>    
                </div>
            }
            {
                !isAdmin && !isTrainer && <UserDashboard/>
            }
        </div>
    );
};

export default DashboardHome;