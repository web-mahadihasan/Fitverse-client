import { UserIcon, UsersIcon, ClipboardIcon, FlameIcon as FireIcon } from "lucide-react"
import InfoCard from "../../../components/common/InfoCard";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import Loading from "../../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import ClassComparisonChart from "./ClassComparisonChart";
import useAdmin from "../../../hooks/useAdmin";
import AdminDashboard from "./AdminDashboard";
import useTrainer from "../../../hooks/useTrainer";

const DashboardHome = () => {
    const [isAdmin] = useAdmin()
    const [isTrainer] = useTrainer()

    return (
        <div>
            {
                isAdmin && <AdminDashboard/>
            }
            {
                isTrainer && <>Welcome Trainer</>
            }
        </div>
    );
};

export default DashboardHome;