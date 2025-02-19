import useAdmin from "../../../hooks/useAdmin";
import AdminDashboard from "./AdminDashboard";
import useAuth from "../../../hooks/useAuth";
import useTrainer from "../../../hooks/useTrainer";
import UserDashboard from "./UserDashboard";
import TrainerDashboard from "./TrainerDashboard";

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
                isTrainer && <TrainerDashboard/>
            }
            {
                !isAdmin && !isTrainer && <UserDashboard/>
            }
        </div>
    );
};

export default DashboardHome;