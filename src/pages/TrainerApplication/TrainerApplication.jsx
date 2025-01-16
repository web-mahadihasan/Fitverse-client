import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProfileImage from "./ProfileImage";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

const animatedComponents = makeAnimated();

const schema = yup.object().shape({
    name: yup
    .string(),
    email: yup
    .string(),
    age: yup
    .string(),
    skills: yup.array().of(yup.string()).optional(),
    availableDays: yup
    .array()
    .of(yup.string()) 
    .optional(), 
    availableTime: yup
    .string(),
})
const TrainerApplication = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        } = useForm({ resolver: yupResolver(schema) });
    
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

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className="space-y-8 max-w-4xl mx-auto my-10 font-poppins px-4 xl:px-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                <div className="md:grid grid-cols-2 gap-4">
                    {/* Name  */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Your Name</label>
                        <input type="text" {...register("name", {minLength: 3, maxLength: 20})} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                    </div>
                    {/* Email  */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Your Name</label>
                        <input type="email" {...register("email")} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                    </div>
                </div>

                {/* Image upload  */}
                <div className="md:grid grid-cols-2 lg:grid-cols-3">
                    <div>
                        <ProfileImage/>
                    </div>
                    <div className="lg:col-span-2">
                        <label htmlFor="skiils" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Your Skills</label>
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
                </div>
               
                {/* AbailAble Days  */}
                <div className="mb-4 z-40">
                <label htmlFor="skiils" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Available Days a Week</label>
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
                        onChange={(selectedOptions) => {
                            field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : []); 
                        }}
                        value={availableDays.filter(day => field.value.includes(day.value))}
                        />
                    )}
                    />
                </div>

                 {/* Age  */}
                 <div>
                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Your age</label>
                    <input type="number" {...register("age")} name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                </div>
                {/* Available Times  */}
                <div>
                    <label htmlFor="availableTime" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Your age</label>
                    <input type="number" {...register("availableTime")} name="availableTime" id="availableTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                </div>
                <div className="p-2 border w-fit px-6 border-dashed border-gray-200">
                    <p className="text-lg font-medium text-gray-500">Current Status: Member</p>
                </div>
                <button type="submit" className="bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                    Submit Application
                </button>
            </form>
            
        </div>
    );
};

export default TrainerApplication;