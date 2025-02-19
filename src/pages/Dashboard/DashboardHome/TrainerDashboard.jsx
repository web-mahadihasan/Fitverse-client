import { BadgeDollarSign , UsersIcon, Shapes, FlameIcon as FireIcon } from "lucide-react"
import InfoCard from "../../../components/common/InfoCard";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import { useQuery } from "@tanstack/react-query";
import AnimatedLoader from "../../Loading/Loading";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer,  Tooltip, Legend, } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


const TrainerDashboard = () => {
    const axiosSecured = useAxiosSecured()
    const {user} = useAuth()

    const { data: trainerData } = useQuery({
        queryKey: ["trainerDashboardData"],
        queryFn: async () => {
            const { data } = await axiosSecured.get(`/trainers/${user?.email}`);
            return data;
        },
        enabled: !!user, 
    });

    const { data: trainerDashboardData, isLoading } = useQuery({
        queryKey: ["trainerDashboardData"],
        queryFn: async () => {
            const { data: trainerSlot } = await axiosSecured.get(`/slot-api/slots/${user?.email}`);
            const { data: myClassUser } = await axiosSecured.get(`/payment-api/trainer-payment-user/${trainerData}`);
            return {trainerSlot, myClassUser};
        },
        enabled: !!trainerData, 
    });
   
    const {trainerSlot, myClassUser} = trainerDashboardData || {}
    
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };
      
    if(isLoading) return <AnimatedLoader/>
    
    return (
        <section className="my-10 px-4 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <InfoCard
                title="Total Slots"
                value={`${trainerSlot?.length || 0} Slots`}
                icon={<BadgeDollarSign  size={40} />}
                gradient="from-blue-500 to-blue-300"
            />
            <InfoCard
                title="Lasted Added"
                value={trainerSlot[0].slotName || "No Slot"}
                icon={<FaMoneyBillTransfer size={40} />}
                gradient="from-green-500 to-green-300"
            />
            <InfoCard
                title="Total Active Class"
                value={myClassUser?.length || 0}
                icon={<Shapes size={40} />}
                gradient="from-yellow-500 to-yellow-300"
            />
            <InfoCard
                title="Total Class Hours"
                value={`${trainerSlot?.reduce((a, b) => a + parseInt(b.classHour), 0)} Hours`}
                icon={<UsersIcon  size={40} />}
                gradient="from-purple-600 to-purple-300"
            />
        </div>

        <div className="min-h-[calc(100vh-300px)] w-full flex items-center justify-center text-center flex-col">
            <h2 className="font-poppins text-gray-700 dark:text-gray-400">Your chart with purchasing Class price</h2>
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
                data={myClassUser}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}

                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="selectedClass" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="packagePrice" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                </Bar>
            </BarChart>  
        </ResponsiveContainer>
        </div>
        
    </section>
    );
};

export default TrainerDashboard;