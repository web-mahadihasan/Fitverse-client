import { useQuery } from "@tanstack/react-query";
import SectionBadge from "../../../../components/common/SectionBadge";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";
import { useEffect, useState } from "react";
import ComparisonChart from "./ComparisonChart";
import { Icon } from "@iconify/react/dist/iconify.js";
import LatestPayment from "./LastedPayment";
import { Helmet } from "react-helmet";

const Balance = () => {
    const axiosSecured = useAxiosSecured()
    const [chartData, setChartData] = useState([])

    const {data: allPaidMember, isLoading} = useQuery({
        queryKey: ["allPaidMember"],
        queryFn: async () => {
            const {data} = await axiosSecured.get("/payment-api/all-payments")
            return data
        }
    })
    const { data: allNewsLetter } = useQuery({
        queryKey: ["allNewsLetter"],
        queryFn: async () => {
        const { data } = await axiosSecured.get(`/newsletter-api/all-subscription-user`);
        return data;
        },
    });
    const totalAmmount = allPaidMember?.length > 0 && allPaidMember.reduce((curr, prev) => curr + prev.packagePrice , 0)

   
    useEffect(()=> {
        if(!isLoading){
            const chartData = [
                {
                    name: "Paid Member",
                    value: allPaidMember?.length
                },
                {
                    name: "Newsletter Subscriber",
                    value: allNewsLetter?.length
                }
            ]
            setChartData(chartData)
        }
        
    }, [allNewsLetter, allPaidMember, isLoading])

    return (
        <div>
            <Helmet>
                <title>Fitverse | Dashboard - Balance </title>
                <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
            </Helmet>
            <div className="text-center mt-5 mb-10 space-y-4">
                <SectionBadge title={"Balance"}/>
                <h3 className="pb-6 text-4xl text-center font-bold  font-kanit capitalize text-secondary-black  mb-7 tracking-wide dark:text-main-dark">Your Account Balance</h3>
            </div>

            {/* Chart  */}
            <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
               <div>
                <h3 className="text-2xl font-kanit font-semibold my-6">Total Ammount</h3>
                <div className="flex items-center p-8 gap-3 border w-fit rounded shadow-md">
                        <p className="border-r-2 px-4 text-main">
                            <Icon icon="hugeicons:save-money-pound" width="64" height="64" />
                        </p>
                        <div>
                            <p className="text-4xl font-bold font-kanit text-main my-2">$ {totalAmmount}</p>
                            <p className="text-xl font-semibold font-poppins text-secondary-black dark:text-gray-400">Total Ammount</p>
                        </div>
                    </div>
               </div>
                <div>
                    <ComparisonChart data={chartData}/> 
                </div>     
            </section>

            {/* Transaction  */}
            <section>
                <LatestPayment/>
            </section>
        </div>
    );
};

export default Balance;

// {
//     allPaidMember && <TestChart paymentData={allPaidMember}/> 
// }