import { useState } from "react";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import SectionBadge from "../../../components/common/SectionBadge";
import SectionHeading from "../../../components/common/SectionHeading";
import useGetUser from "../../../hooks/useGetUser";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const AddNewForum = () => {
    const [imageLink, setImageLink] = useState("");
    const [uploading, setuploading] = useState(false);
    const axiosSecured = useAxiosSecured()
    const [getUser] = useGetUser()
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

      const cloudinaryApi = import.meta.env.VITE_CLOUDINARY_API
        const handleUploadImageClick = (e) => {
            e.preventDefault();
            document.getElementById("secondImage").click();
        };

        const handleFileChange = async (e) => {
            e.preventDefault();
            const imageFile = e.target.files[0];
            const formData = new FormData();
            formData.append("file", imageFile)
            formData.append("upload_preset", "fitVerse")
            setuploading(true)
            if (imageFile) {
            // const imageURL = URL.createObjectURL(file);
            // setImageLink(imageURL);
            try {
                const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryApi}/image/upload`,
                formData)
                setImageLink(data?.url)
                setuploading(false)
            } catch (error) {
                console.log(error)
            }
            }
        };
    
      const onSubmit = async (data) => {
        
        const forumData = {
            ...data,
            coverImage: imageLink,
            postedDate: new Date(),
            name: getUser?.name,
            image: getUser?.image,
            role: getUser?.role,
            upvote: 0,
            downvote: 0,
            downvoteUser: [],
            upvoteUser: [],
            comments: 0
        }
        try {            
            const {data} = await axiosSecured.post(`/forum-api/post-forums`, forumData)
            if(data.insertedId){
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    draggable: true,
                    text: "Successfully added new forum",
                  });
                  reset()
                  setImageLink("")
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
        <section className="w-full font-poppins mt-10">

            {/* title */}
            <div className="w-full flex flex-col items-center justify-center">
                <SectionBadge title={"Forum post"}/>
                <SectionHeading
                    title={"Add New Forum Post"}
                    subtitle={"Create and customize new classes to inspire growth, enhance learning opportunities, and build a stronger foundation for success."}
                />
            </div>

            {/* form area */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-[50px]">
                <div className="flex mx-auto flex-col sm:flex-row items-center gap-[20px]">
                    <div className="flex flex-col gap-[5px] w-full md:w-[80%] lg:w-[70%] mx-auto">
                        <label className="relative w-full text-gray-700 dark:text-gray-400">Forum Title</label>
                        <input  
                            {...register("title", {
                                required: "Title is required",
                                minLength: {
                                  value: 10,
                                  message: "Title must be at least 10 characters",
                                },
                              })}
                        placeholder="Forum title" type="text" name="title" className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-main transition-colors duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"  />

                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                      
                    </div>

                </div>
                    <div className="w-full md:w-[80%] lg:w-[70%] mx-auto">
                        <p className="text-[#777777]  my-4">Upload Class Imgae</p>
                         <>
                              <input
                                type="file"
                                name="image"
                                id="secondImage"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                              {imageLink === "" ? (
                                <div className="w-full flex items-center justify-center flex-col dark:text-gray-200 bg-white border border-dashed border-[#3B9DF8] rounded-md py-6 dark:bg-gray-700 ">
                                  <IoMdCloudUpload className="text-[3rem] text-[#3B9DF8]" />
                                  <p className="mt-2 text-text">Drag and drop here</p>
                                  <p className=" text-text">or</p>
                                  <button
                                    className="px-6 py-1.5 text-primary"
                                    onClick={handleUploadImageClick}
                                  >
                                    Browse
                                  </button>
                                </div>
                              ) : (
                                <div className="relative w-[80%] h-[200px]">
                                  <img
                                    src={imageLink}
                                    alt="image"
                                    className="w-full h-full object-cover"
                                  />
                                  <MdDelete
                                    className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                                    onClick={() => setImageLink("")}
                                  />
                                </div>
                              )}
                            </>
                    </div>
                <div className="flex flex-col gap-[5px] w-full md:w-[80%] lg:w-[70%] mx-auto my-2">
                    <label className="relative w-full text-gray-700 dark:text-gray-400">Blog Description</label>
                    <textarea   
                        {...register("description", {
                            required: "Description is required",
                            minLength: {
                              value: 100,
                              message: "Description must be at least 100",
                            },
                          })}
                    placeholder="Forum details" name="description" className="peer min-h-[100px] border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-main transition-colors duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"></textarea>
                    {errors.title && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                <div>
                    
                </div>

                <div className="text-center my-6">
                <button type="submit" disabled={uploading} className=" bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-3 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                        {uploading? "Image Uploading" : "Add New Form Post"}
                </button>
                </div>

            </form>
        </section>
    );
};

export default AddNewForum;
                    