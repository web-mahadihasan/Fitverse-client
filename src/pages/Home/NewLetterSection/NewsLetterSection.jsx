import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa6";
import {MdOutlineMail} from "react-icons/md";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { format } from "date-fns";

const NewsLetterSection = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()
      const axiosPublic = useAxiosPublic()

    const onSubmit = async (data) =>{
        // const date = format(new Date(), "PP");
        const subscriber = {
            name: data?.name,
            email: data?.email,
            date : new Date()
        }
        
        try {
            const {data} = await axiosPublic.post("/newsletter-api/subscribed", subscriber)
            if(data.insertedId){
                Swal.fire({
                    title: "Successfull",
                    text: "You're successfully register a Newsletter.",
                    icon: "success"
                  });
                  reset()
            }
        } catch (error) {
            Swal.fire({
                title: "Failed",
                text: "When register a fetch to failed! Try again.",
                icon: "error"
              });
              console.log(error)
        }
    } 

    return (
        <section
            className="w-full rounded-xl py-[20px] sm:py-[40px] px-[40px] overflow-hidden sm:px-[80px] bg-gradient-to-br from-[#161819] to-[#5C26B5] relative">
            <div className="w-full lg:w-[70%]">
                <div className="w-full sm:w-[60%]">
                    <h1 className="text-[2rem] sm:text-[2.8rem] text-main-dark font-semibold font-poppins leading-[45px]">Subscibe
                        to Our
                        Newsletter</h1>
                    <p className="text-[0.9rem] text-[#CBCBCB] mt-5">Get weekly update about our
                        product
                        on your email, no spam guaranteed we promise ✌️</p>
                </div>

                <div className="relative mt-10 mb-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex md:items-center gap-6 mb-5 flex-wrap flex-col md:flex-row">
                            <div className="flex-1 relative">
                                
                            <input  
                                {...register("name", { 
                                    required: "Name is required", 
                                    minLength: {
                                      value: 3,
                                      message: "Name must be at least 3 characters long"
                                    } 
                                  })}
                                className="py-3 pr-4 pl-12 flex-1 w-full outline-none rounded-md"
                                name="name"
                                placeholder="Your Name"/> 
                                <FaRegUser className="p-1.5 bg-[#F8F8F8] text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%]"/>
                                
                            </div>
                            <div className="flex-1 relative">
                                <input className="py-3 pr-4 pl-12 w-full outline-none rounded-md"
                                {...register("email", { 
                                    pattern: {
                                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                      message: "Please enter a valid email address"
                                    }
                                  })}
                                placeholder="Email Address"/>
                                <MdOutlineMail className="p-1.5 bg-[#F8F8F8] text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%]"/>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                            {errors.name?.type === "required" && (
                                    <p className="text-red-500 text-sm font-poppins">First name is required</p>
                                )}
                            </div>
                            <div className="flex-1">
                            {errors?.email && (
                                    <p className="text-red-500 text-sm font-poppins">{errors.email.message}</p>
                                )}
                            </div>
                        </div>
                        {/* <MdOutlineMail
                            className="p-1.5 bg-[#F8F8F8] text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%]"/> */}

                        <button type="submit" className="md:absolute md:bottom-[-20px] md:right-[-20px] bg-[#825FF1] hover:bg-[#7755e8] text-white py-3 px-8 rounded">subscribe</button>
                    </form>
                </div>
            </div>

            <MdOutlineMail
                className="text-[30rem] absolute top-[-100px] right-[-100px] text-white opacity-10 rotate-[-30deg]"/>
        </section>
    );
};

export default NewsLetterSection;
                    