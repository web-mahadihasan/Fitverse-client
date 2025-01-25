import { useState } from "react";
import ImageUpload from "./ImageUpload";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionBadge from "../../../components/common/SectionBadge";
import SectionHeading from "../../../components/common/SectionHeading";
import { Helmet } from "react-helmet";

const AddNewClass = () => {
    const [imageLink, setImageLink] = useState("");
    const [uploading, setuploading] = useState(false);
    const axiosSecured = useAxiosSecured();
    const axiosPublic = useAxiosPublic()
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async (data) => {
        console.log(data)
        const classData = {
            ...data,
            image: imageLink,
            total_booked: 0
        }
        try {            
            const {data} = await axiosSecured.post(`/class-api/class/add`, classData)
            if(data.insertedId){
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    draggable: true,
                    text: "Successfully added new class",
                  });
                  reset()
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Try again",
              });
              console.log(error)
        }
            
      }


    return (
        <section className="w-full font-poppins my-10">
            <Helmet>
                <title>Fitverse | Dashboard - Add new class </title>
                <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
            </Helmet>
            {/* title */}
            <div className="w-full flex flex-col items-center justify-center">
                <SectionBadge title={"New class"}/>
                <SectionHeading 
                    title={"Add New class"}
                    subtitle={"Create and customize new classes to inspire growth, enhance learning opportunities, and build a stronger foundation for success."}
                />
            </div>

            {/* form area */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-[50px] dark:text-secondary-black">
                <div className="flex flex-col sm:flex-row items-center gap-[20px]">
                    <div className="flex flex-col gap-[5px] w-full md:w-[80%] lg:w-[70%] mx-auto">
                        <label className="relative w-full text-gray-700 dark:text-gray-400">Class Description</label>
                        <input  {...register("title", { required: true })} placeholder="New class title" type="text" name="title" className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 text-secondary-black w-full focus:border-main transition-colors duration-300 dark:bg-gray-700 dark:border-gray-700 dark:text-white/80"  />
                    </div>
                </div>
                    <div className="w-full md:w-[80%] lg:w-[70%] mx-auto">
                        <p className="text-[#777777]  my-4">Upload Class Imgae</p>
                        <ImageUpload imageLink={imageLink} setImageLink={setImageLink} setUploading={setuploading}/>
                    </div>
                <div className="flex flex-col gap-[5px] mt-[20px] w-full md:w-[80%] lg:w-[70%] mx-auto">
                    <label className="relative w-full text-gray-700 dark:text-gray-400">Class Description</label>
                    <textarea   {...register("description", { required: true })} placeholder="Class details here" name="description" className="peer min-h-[100px] border-[#e5eaf2] border rounded-md outline-none px-4 py- focus:border-main transition-colors duration-300 dark:bg-gray-700 dark:border-gray-700 dark:text-white/80"></textarea>
                    
                </div>


                <div className="text-center mt-6">
                <button type="submit" disabled={uploading} className="font-poppins bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-3 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                    {uploading? "Image Uploading" : "Add Class"}
                </button>
                </div>

            </form>
        </section>
    );
};

export default AddNewClass;
                    