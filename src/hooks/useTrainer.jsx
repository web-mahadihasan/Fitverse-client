import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecured from "./useAxiosSecured";

const useTrainer = () => {
    const {user} = useAuth()
    const axiosSecured = useAxiosSecured()

    const {data: isTrainer, isPending: isTrainerLoading, refetch} = useQuery({
        queryKey: [user?.email, "useTrainer"],
        queryFn: async () => {
            const {data} = await axiosSecured.get(`/users/trainer/${user.email}`)
            return data.trainer
        }
    })
    return[isTrainer, isTrainerLoading, refetch]
};

export default useTrainer;
