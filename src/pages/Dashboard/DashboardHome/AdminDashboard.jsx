import { UserIcon, UsersIcon, ClipboardIcon, FlameIcon as FireIcon } from "lucide-react"
import InfoCard from "../../../components/common/InfoCard";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import Loading from "../../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import ClassComparisonChart from "./ClassComparisonChart";
import useAdmin from "../../../hooks/useAdmin";

const AdminDashboard = () => {
    const axiosSecured = useAxiosSecured()
    const [isAdmin] = useAdmin()
    const { data: allPaymentData, isLoading } = useQuery({
        queryKey: ["allPaymentData"],
        queryFn: async () => {
            const { data } = await axiosSecured.get("/payment-api/all-payments");
            return data;
        },
        enabled: isAdmin, 
    });
    
    if(isLoading) return <Loading/>
    
    return (
        <section className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <InfoCard
                title="Total Users"
                value="1,234"
                icon={<UserIcon size={40} />}
                gradient="from-blue-500 to-blue-300"
            />
            <InfoCard
                title="Active Trainers"
                value="42"
                icon={<UsersIcon size={40} />}
                gradient="from-green-500 to-green-300"
            />
            <InfoCard
                title="Available Classes"
                value="78"
                icon={<ClipboardIcon size={40} />}
                gradient="from-yellow-500 to-yellow-300"
            />
            <InfoCard
                title="Calories Burned Today"
                value="128,500"
                icon={<FireIcon size={40} />}
                gradient="from-red-500 to-red-300"
            />
        </div>


        <div className="my-16">
            <ClassComparisonChart paymentData={allPaymentData}/>
        </div>
    </section>
    );
};

export default AdminDashboard;