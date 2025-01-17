import { FcGoogle } from "react-icons/fc";
import bg from "../../../assets/images/card-bg.png"
import { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { PiEyeClosedBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router";
import loginLoiite from "../../../assets/lottie/login-lottie.json"
import Lottie from "lottie-react";
import { Divider } from 'antd';
import { useForm } from "react-hook-form"
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../../../components/shared/SocialLogin/SocialLogin";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const {setUser, loginWithEmail} = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async (data) => {
        const {email, password} = data || {}
        const toastId = toast.loading('Logging in...');
        try {
            const result = await loginWithEmail(email, password)
            setUser(result?.user)
            toast.success(`Welcome ${result.user.displayName}!`, {
                id: toastId, 
              });
              navigate(from, {replace: true})

        } catch (err) {
            toast.error(`Failed to Login! Please try again`, {
                id: toastId, 
              });
            
            if ((err = "auth/invalid-credential")) {
                setError({
                  ...error,
                  invalid: "Invalid email or password! try again",
                });
            }
            console.log(err)
        }

      }


    return (
        <div className="min-w-screen min-h-screen flex lg:min-w-5xl items-center justify-center">
            <div
        className={`relative min-h-[90vh] bg-no-repeat bg-center bg-cover bg-opacity-30 max-w-7xl mx-auto px-4 xl:px-0 rounded-md`}
        style={{
            backgroundImage: `url('${bg}')`,
          }}
        >
        {/* <div className="absolute w-full inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 duration-300 rounded-md"></div> */}
        <div className="min-h-[90vh] w-full flex items-center max-w-5xl mx-auto xl:px-0 rounded-md">
          <div className="text-center rounded-md  w-full login-shadow" >
            <div className=" rounded-md py-24 lg:px-10">
           
            <div className="max-w-6xl mx-auto px-4 xl:px-0 flex items-center justify-between flex-col md:flex-row gap-8 font-inter">
               
                <div className="w-full flex-1 backdrop-blur-md bg-[#07184F]/10 dark:bg-[#07184F]/20 p-5 md:p-10 rounded-lg relative before:absolute before:inset-0 before:w-1/2 before:h-1/2 before:bg-purple-800/40 before:rounded-full before:blur-3xl before:-z-40">
                    <p className="font-semibold text-primary-dark text-white/85">Welcomoe Back</p>
                    <h3 className="text-4xl font-bold text-white/90">Members Login</h3>
                    <div className="mt-5">
                        {<SocialLogin/>}
                        <Divider plain className="" style={{
                                    borderColor: '#f5f5f5',
                                    color: '#fff'
                                }}
                       >OR Login With Email</Divider>
                    </div>  
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white text-left dark:text-white">Your Email</label>
                    <input type="email" {...register("email", { required: true })} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                </div>
                <p className="text-red-500 text-left w-full text-sm">{errors.email?.message}</p>
                <div className="relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-left text-white">Your Password</label>
                    <input {...register("password", { required: true })} type={showPassword ? "text" : "password"} name="password" id="password" placeholder="●●●●●●●●" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-poppins tracking-wide rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    <div onClick={() =>  setShowPassword(!showPassword)} className="absolute right-3 top-10 cursor-pointer">
                        {showPassword ? <span><VscEyeClosed size={20} /></span> : <span><PiEyeClosedBold size={20} /></span>}
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="ms-auto text-base text-blue-400 hover:underline dark:text-blue-500">Lost Password?</a>
                </div>
                <div className="">
                
                <button type="submit" className="w-full font-poppins bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2.5 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10">
                    Continue With Email
                </button>
                </div>
                <div className="text-sm font-medium font-poppins text-gray-500 dark:text-gray-300 flex-1">
                    Not registered? <Link to={"/auth/register"} className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                </div>
            </form>

        </div>

                <div className="flex-1 order-1 md:order-2">
                    <Lottie animationData={loginLoiite}/>
                </div>
            </div>

            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Login;