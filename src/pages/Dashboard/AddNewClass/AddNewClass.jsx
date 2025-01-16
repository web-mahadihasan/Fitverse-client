import ImageUpload from "./ImageUpload";

const AddNewClass = () => {

    return (
        <section className="w-full font-poppins my-24">

            {/* title */}
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-[2rem] font-bold text-primary leading-[36px]">Add New class</h1>
                <p className="text-[1rem] text-text">This is an animated button on click component.</p>
            </div>

            {/* form area */}
            <form className="w-full mt-[50px]">
                <div className="flex flex-col sm:flex-row items-center gap-[20px]">
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            <input type="text" className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-main transition-colors duration-300"  />
                            <span className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-main text-[#777777] peer-focus:px-1 transition-all duration-300 "> Class name </span>
                        </label>
                    </div>

                    {/* <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            <input type="email" className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"/>
                            <span className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">  Email Address </span>
                        </label>
                    </div> */}
                </div>
                    <div className="min-w-96">
                        <p className="text-[#777777]  my-4">Upload Class Imgae</p>
                        <ImageUpload/>
                    </div>
                <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                    <label className="relative w-full">
                          <textarea className="peer min-h-[100px] lg:w-1/2 border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-main transition-colors duration-300"></textarea>
                        <span className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-main text-[#777777] peer-focus:px-1 transition-all duration-300 "> Class Details</span>
                    </label>
                </div>


                <button type="submit" className="bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-3 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                        Add Class
                </button>

            </form>
        </section>
    );
};

export default AddNewClass;
                    