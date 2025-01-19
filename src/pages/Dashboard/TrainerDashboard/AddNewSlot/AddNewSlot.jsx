import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useGetUser from "../../../../hooks/useGetUser";
import useGetClass from "../../../../hooks/useGetClass";
import { useNavigate } from "react-router";

const animatedComponents = makeAnimated();

const schema = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  age: yup.string(),
  experience: yup.string(),
  skills: yup.array().of(yup.string()).optional(),
  availableDays: yup.array().of(yup.string()).optional(),
  classtitle: yup.array().of(yup.string()).optional(),
  classDuration: yup.string(),
  biography: yup.string(),
  classHour: yup.string(),
  slotName: yup.string(),
});

const AddNewSlot = () => {
    const [classOption, setclassOption] = useState([]);
    const axiosSecured = useAxiosSecured();
    const { user } = useAuth();
    const [allClass] = useGetClass()
    const navigate = useNavigate()

    const { register, handleSubmit, control, reset, setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        skills: [],
        availableDays: []
      },
    });
    // Get skill
    const { data: trainerData, isLoading, isSuccess, refetch} = useQuery({
      queryKey: [user?.email, "trainerData"],
      queryFn: async () => {
        const { data } = await axiosSecured.get(`/trainer-api/trainers/${user?.email}`);
        return data;
      },
      enabled: !!user?.email,
    });
    const {_id: trainerId, ...restTrainerData} = trainerData || {}

    useEffect(() => {
      if (isSuccess && trainerData?.skills) {
        setValue("skills", trainerData.skills);
        setValue("availableDays", trainerData.availableDays);
      }
    }, [isSuccess, trainerData, setValue]);
    useEffect(() => {
          const transformedOptions = allClass?.map(item => ({
            label: item.title,
            value: item.title
          }))
          setclassOption(transformedOptions)
      }, [allClass]);

      const skillsOption = [
        { label: "Bootcamp", value: "Bootcamp" },
        { label: "Pilates", value: "Pilates" },
        { label: "Yoga", value: "Yoga" },
        { label: "Indoor cycling", value: "Indoor cycling" },
        { label: "Bounce & Burn", value: "Bounce & Burn" },
        { label: "Body Blast", value: "Body Blast" },
        { label: "Pump & Sculpt", value: "Pump & Sculpt" },
        { label: "Dynamic Dance Fit", value: "Dynamic Dance Fit" },
        { label: "Spartan Spinning", value: "Spartan Spinning" },
        { label: "Zen Yoga", value: "Zen Yoga" },
        { label: "Total Body Tone", value: "Total Body Tone" },
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
    const slotNames = [
      { value: "Morning Glow", label: "Morning Glow" },
      { value: "Afternoon Vibes", label: "Afternoon Vibes" },
      { value: "Evening Essence", label: "Evening Essence" },
      { value: "Night Boost", label: "Night Boost" },
    ];
    const onSubmit = async (data) => {
      const postedDate = format(new Date(), "PP");
      const {classHour} = data
      const slotApplication = {
        trainerId,
        ...restTrainerData,
        ...data,
        date: postedDate,
      };
      
      if(trainerData.totalHours >= classHour){
        try {
          const { data } = await axiosSecured.post(
            "/slot-api/slots/add",
            slotApplication
          );
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              title: "Successfull",
              text: "Your applicaiton has been submit.",
              icon: "success",
            });
            reset();
            refetch()
            navigate("/dashboard/trainer/manage-slot")
          }
        } catch (error) {
          Swal.fire({
            title: "Failed",
            text: "Failed to submit application.",
            icon: "error",
          });
        }
      }else{
        Swal.fire({
          title: "Failed",
          text: "You're reached max class hour in a week.",
          icon: "error",
        });
      }
      
    };

    if(isLoading) return <p>Loading...</p>


    return (
      <div>
        <div className="text-center my-14 space-y-4">
          <h3 className="font-kanit text-3xl font-semibold uppercase tracking-wide text-main dark:text-main">
            Add New Training Slot
          </h3>
          <p className="max-w-2xl mx-auto text-center font-poppins text-gray-600 dark:text-gray-300">
            Create and manage new training slots with details like date, time,
            duration, and capacity for efficient scheduling.
          </p>
        </div>
        {/* Add slot data details  */}

        <section>
          <div className="space-y-8 max-w-4xl mx-auto my-10 font-poppins px-4 xl:px-0">
            <h3 className="font-poppins font-semibold text-2xl md:text-3xl text-gray-700 dark:text-gray-200">
              Genarel Info{" "}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="md:grid grid-cols-2 gap-4">
                {/* Name  */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { minLength: 3, maxLength: 20 })}
                    defaultValue={user?.displayName}
                    readOnly
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                {/* Email  */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    defaultValue={user?.email}
                    readOnly
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Image upload  */}
              <div className="md:grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                  >
                    Your Age<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("age")}
                    defaultValue={trainerData?.age}
                    readOnly
                    name="age"
                    id="age"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                {/* Age  */}
                <div>
                  <label
                    htmlFor="experience"
                    className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                  >
                    Year of Experiecne (year)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("experience")}
                    defaultValue={trainerData?.experience}
                    readOnly
                    name="experience"
                    id="experience"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              {/* Skills  */}
              <div className="">
                <label
                  htmlFor="skiils"
                  className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                >
                  Your Skills <span className="text-red-500">*</span>
                </label>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {skillsOption.map((skill) => (
                    <div
                      key={skill.value}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                    >
                      <Controller
                        name="skills"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <Checkbox
                              id={skill.value}
                              checked={value?.includes(skill.value)}
                              onCheckedChange={(isChecked) => {
                                const updatedValue = isChecked
                                  ? [...(value || []), skill.value]
                                  : (value || []).filter(
                                      (val) => val !== skill.value
                                    );
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

              {/* Available Times  */}
              <div>
                <label
                  htmlFor="classDuration"
                  className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                >
                  Availabe total Hours<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("classDuration")}
                  defaultValue={trainerData?.totalHours}
                  name="classDuration"
                  id="classDuration"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Biography  */}
              <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                >
                  Biography <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("biography")}
                  defaultValue={trainerData?.biography}
                  placeholder="About yourself"
                  className="peer min-h-[80px] lg:w-full border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-main transition-colors duration-300 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-gray-700 dark:text-gray-300"
                ></textarea>
                {/* <span className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-main text-[#777777] peer-focus:px-1 transition-all duration-300 "> Biography</span> */}
              </div>

              {/* New slot info  */}
              <h3 className="font-poppins font-semibold text-xl text-gray-700 dark:text-gray-200">
                New Slot Info{" "}
              </h3>

              <div className="md:grid grid-cols-2 gap-6">
                <div className="mb-4 z-40">
                  <label
                    htmlFor=""
                    className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                  >
                    Available Days a Week <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="availableDays"
                    control={control}
                    defaultValue={[trainerData?.availableDays]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        d
                        isMulti
                        options={availableDays}
                        // styles={customStyles()}
                        onChange={(selectedOptions) => {
                          field.onChange(
                            selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : []
                          );
                        }}
                        value={availableDays.filter((day) =>
                          field.value.includes(day.value)
                        )}
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
                    Select Class <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="classtitle"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        d
                        isMulti
                        options={classOption}
                        // styles={customStyles()}
                        onChange={(selectedOptions) => {
                          field.onChange(
                            selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : []
                          );
                        }}
                        value={classOption?.filter((slot) =>
                          field.value.includes(slot.value)
                        )}
                      />
                    )}
                  />
                </div>

                {/* <div className="mb-4 z-40">
                      <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white">Available Slot <span className="text-red-500">*</span></label>
                      <Controller
                          name="availableSlot"
                          control={control}
                          defaultValue={[]}
                          render={({ field }) => (
                              <Select
                              {...field}  
                              closeMenuOnSelect={false}
                              components={animatedComponents} d
                              isMulti
                              options={SlotOption}
                              // styles={customStyles()}
                              onChange={(selectedOptions) => {
                                  field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : []); 
                              }}
                              value={SlotOption.filter(slot => field.value.includes(slot.value))}
                              />
                          )}
                          />
                      </div> */}
              </div>

              <div className="md:grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="classHour"
                    className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                  >
                    Class Hour<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("classHour")}
                    name="classHour"
                    id="classHour"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                {/* Age  */}
                <div className="mb-4 z-20">
                  <label
                    htmlFor=""
                    className="block mb-2 text-sm font-medium text-gray-800 text-left dark:text-white"
                  >
                    Select Slot Name <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="slotName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        components={animatedComponents}
                        options={slotNames}
                        // styles={customStyles()}
                        onChange={(selectedOption) => {
                          field.onChange(
                            selectedOption ? selectedOption.value : ""
                          );
                        }}
                        value={slotNames.find(
                          (slotName) => slotName.value === field.value
                        )}
                        isMulti={false}
                        closeMenuOnSelect={true}
                      />
                    )}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10"
              >
                Add New Slot
              </button>
            </form>
          </div>
        </section>
      </div>
  );
};

export default AddNewSlot;
