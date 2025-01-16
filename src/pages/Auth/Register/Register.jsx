import { FcGoogle } from "react-icons/fc";
import bg from "../../../assets/images/card-bg.png"
import { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { PiEyeClosedBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router";
import loginLoiite from "../../../assets/lottie/register.json"
import Lottie from "lottie-react";
import { Divider } from 'antd';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import {  Spin } from 'antd';
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const schema = yup.object().shape({
    name: yup 
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot be more than 20 characters")
    .required("Enter full name here"),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
      )
      .required("Password is required"),
      image: yup.mixed()
  });

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false)
    const {loginWithGoogle, setUser, registerNewUser, updataUser} = useAuth()
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState("")

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const cloudinaryApi = import.meta.env.VITE_CLOUDINARY_API
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });


    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0]
        const formData = new FormData();
        formData.append("file", imageFile)
        formData.append("upload_preset", "fitVerse")
        setUploading(true)
        try {
            const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryApi}/image/upload`,
                formData
            )
          
            setImage(data?.url)
            setUploading(false)
        } catch (error) {
            console.log(error)
        }   
    }
    const onSubmit = async (data) => {

        const {name, email, password} = data || {}
        const updateData = {
            displayName: name,
            photoURL: image
        }
        const toastId = toast.loading('Logging in...');
        try {
            const result = await registerNewUser(email, password)
            setUser(result.user)
            console.log(result.user)
            const update = await updataUser(updateData)
            toast.success(`Welcome ${result.user.displayName}!`, {
                id: toastId, 
              });            
            navigate(from, {replace: true})
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Something went wrong! Try again",
            });
            console.log(err)
        }
        
    };

    const handleGoogleLogin = async () =>  {
        const toastId = toast.loading('Logging in...');
        try {
            const result = await loginWithGoogle()

            toast.success(`Welcome ${result.user.displayName}!`, {
                id: toastId, 
              });
            setUser(result.user)
            console.log(result.user)
            navigate(from, {replace: true})
        } catch (err) {
            toast.error("Failed to Login")
            console.log(err)
        }
    }

    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center ">
            <div
                className={`relative min-h-[85vh] bg-no-repeat bg-center bg-cover bg-opacity-30 lg:min-w-5xl mx-auto px-4 xl:px-0 rounded-md`}
                style={{
            backgroundImage: `url('${bg}')`,
        }}
        >
        {/* <div className="absolute w-full inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 duration-300 rounded-md"></div> */}
        <div className="min-h-[90vh] w-full flex items-center max-w-5xl mx-auto xl:px-0 rounded-md lg:min-w-5xl">
        <div className="text-center rounded-md  w-full login-shadow" >
            <div className=" rounded-md py-16 lg:px-10">
        
            <div className="max-w-6xl mx-auto px-4 xl:px-0 flex items-center justify-between flex-col md:flex-row gap-8 font-inter">
            
                <div className="w-full flex-1 backdrop-blur-md bg-[#07184F]/10 dark:bg-[#07184F]/20 p-5 md:p-10 rounded-lg relative before:absolute before:inset-0 before:w-1/2 before:h-1/2 before:bg-purple-800/40 before:rounded-full before:blur-3xl before:-z-40">
                    <p className="font-semibold text-primary-dark text-white/85">Registration</p>
                    <h3 className="text-4xl font-bold text-white/90 font-kanit">Start Today With us</h3>
                    <div className="mt-5">
                        <button onClick={handleGoogleLogin} className="relative w-full text-sm inline-block p-[1px] font-medium text-white bg-transparent rounded-lg group">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg "></span>
                            <p className="relative flex items-center justify-center gap-5 w-full px-6 py-2 h-full bg-black rounded-lg group-hover:bg-opacity-80 transition duration-200">
                                <span><FcGoogle size={22} /></span>
                                <span className="font-poppins">Register With Google</span>
                            </p>
                        </button>
                        <Divider plain className="" style={{
                                    borderColor: '#f5f5f5',
                                    color: '#fff'
                                }}
                    >OR Register With Email</Divider>
                    </div>  
                <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4" action="#">
                    {/* name  */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white text-left dark:text-white">Your Name</label>
                        <input type="text" {...register("name", {minLength: 3, maxLength: 20})} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                    </div>
                    <p className="text-red-500 text-left w-full text-sm">{errors.name?.message}</p>
                    {/* email  */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white text-left dark:text-white">Your Email</label>
                        <input type="email" 
                        {...register("email")}
                        name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <p className="text-red-500 text-left w-full text-sm">{errors.email?.message}</p>
                    <div className="relative">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-left text-white">Your Password</label>
                        <input {...register("password")} type={showPassword ? "text" : "password"} name="password" id="password" placeholder="●●●●●●●●" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-poppins tracking-wide rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                        <div onClick={() =>  setShowPassword(!showPassword)} className="absolute right-3 top-10 cursor-pointer">
                            {showPassword ? <span><VscEyeClosed size={20} /></span> : <span><PiEyeClosedBold size={20} /></span>}
                        </div>
                    </div>
                    <p className="text-red-500 text-left w-full text-sm">{errors.password?.message}</p>
                     {/* Image upload  */}
                     <div className="relative my-4 inline-flex w-full items-center gap-2 rounded-full border border-purple-600 text-sm font-poppins text-slate-500">
                        <input {...register("image")}
                        onChange={handleImageUpload}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="peer order-2 [&::file-selector-button]:hidden w-full"
                        />
                        <label
                        htmlFor="file-upload"
                        className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300  focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-emerald-300 peer-disabled:bg-emerald-300"
                        >
                        {" "}
                        Upload a file{" "}
                        </label>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-300">Accept our terms and conditions.</label>
                        </div>
                        {/* <a href="#" className="ms-auto text-base text-blue-400 hover:underline dark:text-blue-500">Lost Password?</a> */}
                    </div>
                   
                    <div className="">
                     
                    <button type="submit" disabled={uploading} className="w-full font-poppins bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2.5 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10">
                        {
                            uploading?  <span className="text-white dark:text-zinc-900">  <Spin indicator={<LoadingOutlined spin />} size="small" /> Image uploading...</span>
                            :<span className="text-white dark:text-zinc-900">Register with email</span>
                        }
                    </button>

                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex-1 font-poppins">
                        Already registered? <Link to={"/auth/login"} className="text-blue-700 hover:underline dark:text-blue-500">Log in here</Link>
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

export default Registration;
