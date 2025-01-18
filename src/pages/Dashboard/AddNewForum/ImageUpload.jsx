
// icons
import axios from "axios";
import { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const ImageUpload = ({imageLink, setImageLink, setUploading}) => {
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
    setUploading(true)
    if (imageFile) {
      // const imageURL = URL.createObjectURL(file);
      // setImageLink(imageURL);
      try {
        const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryApi}/image/upload`,
          formData)
          setImageLink(data?.url)
          setUploading(false)
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <>
      <input
        type="file"
        name="image"
        id="secondImage"
        className="hidden"
        onChange={handleFileChange}
      />
      {imageLink === "" ? (
        <div className="w-full flex items-center justify-center flex-col bg-white border border-dashed border-[#3B9DF8] rounded-md py-6 ">
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
  );
};

export default ImageUpload;
                