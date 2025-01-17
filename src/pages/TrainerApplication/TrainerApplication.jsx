import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProfileImage from "./ProfileImage";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";
import { axiosSecured } from "../../hooks/useAxiosSecured";
import Swal from "sweetalert2";
import useUser from "../../hooks/userUser";

const animatedComponents = makeAnimated();

const schema = yup.object().shape({
    name: yup
    .string(),
    email: yup
    .string(),
    age: yup
    .string(),
    experience: yup
    .string(),
    skills: yup.array().of(yup.string()).optional(),
    availableDays: yup
    .array()
    .of(yup.string()) 
    .optional(), 
    availableSlot: yup
    .string(), 
    classDuration: yup
    .string(),
    biography: yup
    .string(),
})

const TrainerApplication = () => {
  const [imageLink, setImageLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userById] = useUser()
  

  const {user} = useAuth()
  const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
        } = useForm({ resolver: yupResolver(schema) });
        
        console.log(imageLink)
   

    const skillsOption = [
        { label: "Bootcamp", value: "Bootcamp" },
        { label: "Pilates", value: "Pilates" },
        { label: "Yoga", value: "Yoga" },
        { label: "Indoor cycling", value: "Indoor cycling" },
        { label: "Bounce & Burn", value: "Bounce & Burn" },
        { label: "Body Blast", value: "Body Blast" },
        { label: "Pump & Sculpt", value: "Pump & Sculpt" },
      ];
      
      const availableDays = [
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
        { value: "Sunday", label: "Sunday" },
      ];
      const availableSlot = [
        { value: "Morning", label: "Morning" },
        { value: "Afternoon", label: "Afternoon" },
        { value: "Evening", label: "Evening" },
        { value: "Night", label: "Night" }
      ];
    const onSubmit = async(data) => {
        console.log(data)
        const date = format (new Date(), "PP")
        const applicationInfo = {
          ...data,
          image: imageLink,
          date,
          status: "pending",
          userId: userById?._id,
          role: userById?.role
        }
        try {
          const {data} = await axiosSecured.post("/apply-trainer", applicationInfo)
          console.log(data)
          if(data.insertedId){
            Swal.fire({
              title: "Successfull",
              text: "Your applicaiton has been submit.",
              icon: "success"
            })
            reset()
          }
        } catch (error) {
          Swal.fire({
            title: "Failed",
            text: "Failed to submit application.",
            icon: "error"
          })
        }
    }
    return (
        <div className="space-y-8 max-w-4xl mx-auto my-10 font-poppins px-4 xl:px-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                <div className="md:grid grid-cols-2 gap-4">
                    {/* Name  */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Your Name</label>
                        <input type="text" {...register("name", {minLength: 3, maxLength: 20})} defaultValue={user?.displayName} readOnly name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                    </div>
                    {/* Email  */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Your Name</label>
                        <input type="email" {...register("email")} defaultValue={user?.email} readOnly name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                    </div>
                </div>

                {/* Image upload  */}
                <div className="md:grid grid-cols-2">
                    <div>
                        <ProfileImage setImageLink={setImageLink} imageLink={imageLink} setUploading={setUploading}/>
                    </div>
                    <div className="grid grid-cols-1 grid-rows-2">
                        {/* Age  */}
                        <div>
                            <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Your age<span className="text-red-500">*</span></label>
                            <input type="number" {...register("age")} name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                        </div>
                        {/* Age  */}
                        <div>
                            <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Year of Experiecne (year)<span className="text-red-500">*</span></label>
                            <input type="number" {...register("experience")} name="experience" id="experience" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                        </div>
                    </div>
                            
                </div>
                {/* Skills  */}
                <div className="">
                        <label htmlFor="skiils" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Your Skills <span className="text-red-500">*</span></label>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                            {skillsOption.map((skill) => (
                                <div
                                key={skill.value}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                >
                                <Controller
                                    name="skills"
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field: { onChange, value } }) => (
                                    <>
                                        <Checkbox
                                        id={skill.value}
                                        checked={value?.includes(skill.value)}
                                        onCheckedChange={(isChecked) => {
                                            const updatedValue = isChecked
                                            ? [...(value || []), skill.value]
                                            : value.filter((val) => val !== skill.value);
                                            onChange(updatedValue);
                                        }}
                                        />
                                        <Label htmlFor={skill.value}>{skill.label}</Label>
                                    </>
                                    )}
                                />
                                </div>
                            ))}
                        </div>
                    </div> 
                {/* AbailAble Days  */}
                <div className="md:grid grid-cols-2 gap-6">
                    <div className="mb-4 z-40">
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Available Days a Week <span className="text-red-500">*</span></label>
                    <Controller
                        name="availableDays"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Select
                            {...field}  
                            closeMenuOnSelect={false}
                            components={animatedComponents} d
                            isMulti
                            options={availableDays}
                            // styles={customStyles()}
                            onChange={(selectedOptions) => {
                                field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : []); 
                            }}
                            value={availableDays.filter(day => field.value.includes(day.value))}
                            />
                        )}
                        />
                    </div>

                    {/* Available slot  */}
                    <div className="mb-4 z-40">
                      <label
                        htmlFor=""
                        className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                      >
                        Available Slot <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="availableSlot"
                        control={control}
                        defaultValue="" 
                        render={({ field }) => (
                          <Select
                            {...field}
                            components={animatedComponents}
                            options={availableSlot}
                            // styles={customStyles()}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption ? selectedOption.value : ""); 
                            }}
                            value={availableSlot.find(slot => slot.value === field.value)}
                            isMulti={false} 
                            closeMenuOnSelect={true} 
                          />
                        )}
                      />
                    </div>
                </div>
                

                 
                {/* Available Times  */}
                <div>
                    <label htmlFor="classDuration" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Class Duration (Hours)<span className="text-red-500">*</span></label>
                    <input type="number" {...register("classDuration")} name="classDuration" id="classDuration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                </div>
                
                {/* Biography  */}
                <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Biography <span className="text-red-500">*</span></label>
                    <textarea {...register("biography")} placeholder="About yourself" className="peer min-h-[100px] lg:w-full border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-main transition-colors duration-300 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"></textarea>
                        {/* <span className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-main text-[#777777] peer-focus:px-1 transition-all duration-300 "> Biography</span> */}
                    
                </div>

                <div className="p-2 border w-fit px-6 border-dashed border-gray-200">
                    <p className="text-lg font-medium text-gray-500">Current Status: Member</p>
                </div>

                <button type="submit" disabled={uploading} className="bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                    {uploading? "Image uploading" : "Submit Application"}
                </button>
            </form>
            
        </div>
    );
};

export default TrainerApplication;


// const customStyles = () => {
            
//   const isDarkMode = document.documentElement.classList.contains("dark");
//   return {
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: isDarkMode ? "rgb(31 41 55)" : "rgb(255 255 255)",
//       color: isDarkMode ? "rgb(255 255 255)" : "rgb(0 0 0)", 
//     }),
//     menu: (provided) => ({
//       ...provided,
//       backgroundColor: isDarkMode ? "rgb(31 41 55)" : "rgb(255 255 255)",
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       color: isDarkMode ? "rgb(255 255 255)" : "rgb(0 0 0)", 
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isFocused
//         ? isDarkMode
//           ? "rgb(55 65 81)"
//           : "rgb(229 231 235)" 
//         : "transparent",
//       color: isDarkMode ? "rgb(255 255 255)" : "rgb(0 0 0)", 
//     }),
//   };
// };