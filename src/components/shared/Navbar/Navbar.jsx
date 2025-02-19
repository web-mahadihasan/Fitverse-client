import { useState } from "react";
import { Link, NavLink } from "react-router";
import MobileMenu from "./MobileMenu";
import useApp from "../../../hooks/useApp";
import fitnessLogo1 from "../../../assets/icon/icon1.png"
import { CiMenuFries } from "react-icons/ci";
import CurrentUserInfo from "./CurrentUserInfo";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import fitnessLogo from "../../../assets/icon/Fitness-log.png"
import useAuth from "../../../hooks/useAuth";
import userIcon  from "../../../assets/icon/user.png"
import { Copy, X } from 'lucide-react';
import toast from "react-hot-toast";

const Navbar = () => {
    const [profileMenu, setProfileMenu] = useState(false)
    const {openMenu, setOpenMenu, isInvitedModalOpen, setIsInvitedModalOpen} = useApp()
    const {user} = useAuth()
    const inviteLink = 'https://fitverse-bd.web.app/auth/register';

    const handleCopy = () => {
      navigator.clipboard.writeText(inviteLink);
      toast.success("Successfully copy link")
    }

  return (
    <nav className=" fixed top-0 w-full z-50 transition-all duration-300 font-poppins bg-white/80">
      <div className="max-width mx-auto px-4 xl:px-0 border-b border-gray-100">
        <div className="flex items-center justify-between h-20">
          <Link className="flex items-center space-x-2 text-[#1d4ed8]" to="/">
            <div className="relative">
              <img src={fitnessLogo} alt="" className="h-9"/>
            </div>
            <span className="text-4xl font-gagalin tracking-wider font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#5A29E4] to-[#9F72F9]">
              FitVerse
            </span>
          </Link>


          <div className="hidden lg:flex items-center space-x-1">
            <div className="relative font-poppins">
              
            </div>
            <ul className="flex items-center gap-4">
                <li className="navbar"> <NavLink to={"/"}>Home</NavLink> </li>
                <li className="navbar"><NavLink to={"all-classes"}>All Classes </NavLink></li>
                <li className="navbar"><NavLink to={"/all-trainers"}>Trainers</NavLink></li>
                { user && <li className="navbar"><NavLink to={"/forums"}>Forums</NavLink></li>}
                <li className="navbar"><NavLink to={"/about-us"}>About us</NavLink></li>
                <li className="navbar"><NavLink to={"/contact-us"}>Contact us</NavLink></li>
            </ul>
            {/* <a
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#1d4ed8] hover:bg-blue-50 transition-colors duration-200"
            >
              Contact
            </a> */}
          </div>
          <div className="relative flex items-center gap-3">
            {
              user? <button onClick={()=> setProfileMenu(!profileMenu)} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                <img className="w-10 h-10 rounded-full ring-2 ring-main ring-offset-2 ring-offset-white" src={user?.photoURL || userIcon} alt="user photo"/>
                </button> : <Link to={"/auth/login"}>
                  <button className="hidden md:block bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10">
                        Log in
                    </button>
                </Link>
            }
                        
                <div className={`${profileMenu? "block": "hidden "} absolute top-[100%] right-1 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                    <CurrentUserInfo setProfileMenu={setProfileMenu}/>
                   
                </div>
          <button onClick={()=> setOpenMenu(true)} className="md:px-4 lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <CiMenuFries size={26}/>
          </button>
            
          </div>
        </div>
        {
            openMenu && <MobileMenu/>
        }

        {/* invited modal  */}
        <div>
        <div
            className={`${
              isInvitedModalOpen
                    ? " scale-[1] opacity-100"
                    : " scale-[0] opacity-0"
            } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative">
        {/* Close Button */}
        <button onClick={() => setIsInvitedModalOpen(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>
        
        {/* Modal Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Invite Friends & Earn Rewards
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Share your unique link with friends and get a <span className="text-indigo-600 font-semibold">20% discount</span> on your next purchase when they join!
            </p>
          </div>

          {/* Invite Link Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Your Personal Invite Link
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-600 font-mono text-sm">
                {inviteLink}
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-3 transition-colors"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-indigo-50 rounded-lg p-4">
            <p className="text-sm text-indigo-800 text-center">
              Your friends will get a 15% welcome discount on their first purchase too!
            </p>
          </div>
        </div>
      </div>
        </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
