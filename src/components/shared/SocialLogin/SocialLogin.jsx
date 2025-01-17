import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const {setUser, loginWithGoogle} = useAuth()
    const navigate = useNavigate()
     const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const axiosPublic = useAxiosPublic()

    const handleGoogleLogin = async () =>  {
        const toastId = toast.loading('Trying Loged in...');
        try {
            const result = await loginWithGoogle()

            const userProfile = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL,
                createTime: result?.user?.metadata?.creationTime,
                role: "member"
            }

            const {data} = await axiosPublic.post("/users", userProfile)
            toast.success(`Welcome ${result.user.displayName}!`, {
                id: toastId, 
            });
            setUser(result.user)
            navigate(from, {replace: true})

            
        } catch (err) {
            toast.error("Failed to Login")
            console.log(err)
        }
    }
    return (
        <div>
            <button onClick={handleGoogleLogin} className="relative w-full text-sm inline-block p-[1px] font-medium text-white bg-transparent rounded-lg group">
                 <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg "></span>
                 <p className="relative flex items-center justify-center gap-5 w-full px-6 py-2 h-full bg-black rounded-lg group-hover:bg-opacity-80 transition duration-200">
                     <span><FcGoogle size={22} /></span>
                     <span className="font-poppins">Register With Google</span>
                 </p>
             </button>
        </div>
    );
};

export default SocialLogin;