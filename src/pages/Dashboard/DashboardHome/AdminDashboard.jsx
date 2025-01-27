import { UserIcon, UsersIcon, ClipboardIcon, FlameIcon as FireIcon } from "lucide-react"
import InfoCard from "../../../components/common/InfoCard";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import { useQuery } from "@tanstack/react-query";
import ClassComparisonChart from "./ClassComparisonChart";
import useAdmin from "../../../hooks/useAdmin";
import AnimatedLoader from "../../Loading/Loading";
import { FaMoneyBillTransfer } from "react-icons/fa6";

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
    const {data: adminHomeData} = useQuery({
        queryKey: ["adminHomeData"],
        queryFn: async () => {
            const {data: allUsers} = await axiosSecured.get('/users')
            const {data: adminHomeTrainer} = await axiosSecured.get(`/trainer-api/all-trainer`)
            const {data: adminHomeClass} = await axiosSecured.get(`/class-api/class`)
            const {data: adminHomePayments} = await axiosSecured.get(`/payment-api/all-payments`)
            return {allUsers, adminHomeTrainer, adminHomeClass, adminHomePayments}
        }
    })
    const {allUsers, adminHomeTrainer, adminHomeClass, adminHomePayments} = adminHomeData || {}
    if(isLoading) return <AnimatedLoader/>
    
    return (
        <section className="my-10 px-4 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <InfoCard
                title="Total Users"
                value={allUsers?.length || 0}
                icon={<UserIcon size={40} />}
                gradient="from-blue-500 to-blue-300"
            />
            <InfoCard
                title="Active Trainers"
                value={adminHomeTrainer?.length || 0}
                icon={<UsersIcon size={40} />}
                gradient="from-green-500 to-green-300"
            />
            <InfoCard
                title="Available Classes"
                value={adminHomeClass?.length || 0}
                icon={<ClipboardIcon size={40} />}
                gradient="from-yellow-500 to-yellow-300"
            />
            <InfoCard
                title="Total Compelete Payments"
                value={adminHomePayments?.length || 0}
                icon={<FaMoneyBillTransfer size={40} />}
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