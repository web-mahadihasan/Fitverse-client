import { UserIcon, UsersIcon, ClipboardIcon, FlameIcon as FireIcon } from "lucide-react"
import InfoCard from "../../../components/common/InfoCard";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import { useQuery } from "@tanstack/react-query";
import ClassComparisonChart from "./ClassComparisonChart";
import useAdmin from "../../../hooks/useAdmin";
import AnimatedLoader from "../../Loading/Loading";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
    const axiosSecured = useAxiosSecured()
    const {user} = useAuth()

    const { data: userDashboardData, isLoading } = useQuery({
        queryKey: ["userDashboardData"],
        queryFn: async () => {
            const { data: userPayment } = await axiosSecured.get(`/payment-api/my-payment/${user?.email}`);
            const {data: bookedTrainer} = await axiosSecured.get(`/payment-api/my-payment/${user?.email}`);
            return {userPayment, bookedTrainer};
        },
        enabled: !!user, 
    });
    // console.log(userPayment)
    // const {data: adminHomeData} = useQuery({
    //     queryKey: ["adminHomeData"],
    //     queryFn: async () => {
    //         const {data: allUsers} = await axiosSecured.get('/users')
    //         const {data: adminHomeTrainer} = await axiosSecured.get(`/trainer-api/all-trainer`)
    //         const {data: adminHomeClass} = await axiosSecured.get(`/class-api/class`)
    //         const {data: adminHomePayments} = await axiosSecured.get(`/payment-api/all-payments`)
    //         return {allUsers, adminHomeTrainer, adminHomeClass, adminHomePayments}
    //     }
    // })
    const {userPayment, bookedTrainer} = userDashboardData || {}
    if(isLoading) return <AnimatedLoader/>
    
    return (
        <section className="my-10 px-4 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <InfoCard
                title="Spent Ammount"
                value={`$ ${userPayment.reduce((a, b) => a + b.packagePrice, 0)}`}
                icon={<UserIcon size={40} />}
                gradient="from-blue-500 to-blue-300"
            />
            <InfoCard
                title="Lasted Payment"
                value={`$ ${userPayment[0].packagePrice || 0}`}
                icon={<FaMoneyBillTransfer size={40} />}
                gradient="from-green-500 to-green-300"
            />
            <InfoCard
                title="Total Active Class"
                value={userPayment.length || 0}
                icon={<ClipboardIcon size={40} />}
                gradient="from-yellow-500 to-yellow-300"
            />
            <InfoCard
                title="Booked Trainers"
                value={bookedTrainer?.length || 0}
                icon={<UsersIcon  size={40} />}
                gradient="from-purple-600 to-purple-300"
            />
        </div>


        {/* <div className="my-16">
            <ClassComparisonChart paymentData={allPaymentData}/>
        </div> */}
    </section>
    );
};

export default UserDashboard;