
// icons
import axios from "axios";
import { CgProfile } from "react-icons/cg";

const ProfileImage = ({setImageLink, imageLink, setUploading}) => {
  

  const handleUploadImageClick = () => {
    document.getElementById("fourthImage").click();
  };
  const cloudinaryApi = import.meta.env.VITE_CLOUDINARY_API

  const handleFileChange = async(e) => {
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
//   const handleImageUpload = async (e) => {
//     const imageFile = e.target.files[0]
    
//     setUploading(true)
//     try {
        
      
//         setImage(data?.url)
//         setUploading(false)
//     } catch (error) {
//         console.log(error)
//     }   
// }

  return (
    <div className=" ">
      <input
        type="file"
        name="image"
        id="fourthImage"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="w-[150px] h-[150px] rounded-full border border-[#e5eaf2] flex items-center justify-center">
        {imageLink === "" ? (
          <CgProfile className="text-[10rem] text-[#e5eaf2]" />
        ) : (
          <img
            src={imageLink}
            alt="image"
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>

      <div
        className="px-4 py-2 bg-[#3B9DF8] text-white rounded-md mt-2 text-left w-fit cursor-pointer"
        onClick={handleUploadImageClick}
      >
        Upload profile
      </div>
    </div>
  );
};

export default ProfileImage;
                