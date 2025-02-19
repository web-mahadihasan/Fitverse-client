import { Link } from "react-router";
import { FiPower, FiUserPlus } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiLifebuoy } from "react-icons/hi2";
// import toast from "react-hot-toast";
import { RiUserSharedLine } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useApp from "../../../hooks/useApp";

const CurrentUserInfo = ({setProfileMenu}) => {
    const {user, logOutUser} = useAuth()
    const {setIsInvitedModalOpen} = useApp()


    const handleSignOut = async () => {
        const toastId = toast.loading('Logging in...');
        try {
            const result = await logOutUser()
                toast.success(`Successfully Logout!`, {
                    id: toastId, 
                });
                setProfileMenu(false)
        } catch (error) {
            toast.success(`Failed to Logout! Try again`, {
                id: toastId, 
              });
              console.log(error)
        }
    }
    return (
           <div className="min-w-60 space-y-1">
                 <div className="flex flex-col px-6 py-2 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                   <span className="text-lg font-medium text-black/80">{user?.displayName}</span>
                   <span className="lowercase">{user?.email}</span>
                 </div>
                 <Link to={'/dashboard/user/profile'} className="flex items-center px-6 py-2 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                     <RiUserSharedLine size={20}/>
                     <span className="mx-1">
                        <span>My Profile</span>
                     </span>
                 </Link>
                 <Link to={'/dashboard'} className="flex items-center px-6 py-2 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                     <LuLayoutDashboard size={20}/>
                     <span className="mx-1">
                        Dashboard
                     </span>
                 </Link>
                 <Link onClick={() => setIsInvitedModalOpen(true)} className="flex items-center px-6 py-2 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                     <FiUserPlus size={20}/>
                     <span className="mx-1">
                         Invited People
                     </span>
                 </Link>
                 <Link to={'/helps'} className="flex items-center px-6 py-2 font-medium text-base text-gray-700 gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100">
                     <HiLifebuoy />
                     <span className="mx-1">
                         Help
                     </span>
                 </Link>
                 {/* <Dropdown.Item className="gap-2"><HiLifebuoy />Help</Dropdown.Item> */}
                 <div className="divider my-0"></div>
                 <button onClick={handleSignOut} className="text-red-500 flex items-center px-6 py-2 text-base gap-2 capitalize transition-colors duration-300 transform  hover:bg-gray-100 w-full" >
                   <FiPower />
                     <span className="mx-1">
                         Sign Out
                     </span>
                 </button>
             </div>
    );
};

export default CurrentUserInfo;