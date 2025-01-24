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

const Navbar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false)
    const [profileMenu, setProfileMenu] = useState(false)
    const {openMenu, setOpenMenu} = useApp()
    const {user} = useAuth()

    const navLinks = <>
        <Link className="block px-4 py-2 text-sm text-gray-700 hover:text-[#1d4ed8] hover:bg-blue-50 transition-colors duration-200 cursor-pointer" to="/all-classes"> All Classes </Link>
        <Link className="block px-4 py-2 text-sm text-gray-700 hover:text-[#1d4ed8] hover:bg-blue-50 transition-colors duration-200" to="/all-classes"> Classes Name</Link>
        <Link className="block px-4 py-2 text-sm text-gray-700 hover:text-[#1d4ed8] hover:bg-blue-50 transition-colors duration-200" to="/all-classes"> Classes Name</Link>
        <Link className="block px-4 py-2 text-sm text-gray-700 hover:text-[#1d4ed8] hover:bg-blue-50 transition-colors duration-200" to="/all-classes"> Classes Name</Link>
        <Link className="block px-4 py-2 text-sm text-gray-700 hover:text-[#1d4ed8] hover:bg-blue-50 transition-colors duration-200" to="/all-classes"> Classes Name</Link>
    </>
  return (
    <nav className=" fixed top-0 w-full z-50 transition-all duration-300 font-poppins bg-white/80">
      <div className="max-width mx-auto px-4 xl:px-0 border-b border-gray-100">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link className="flex items-center space-x-2 text-[#1d4ed8]" to="/">
            <div className="relative">
              <img src={fitnessLogo} alt="" className="h-9"/>
            </div>
            <span className="text-4xl font-gagalin tracking-wider font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#5A29E4] to-[#9F72F9]">
              FitVerse
            </span>
          </Link>


          <div className="hidden md:flex items-center space-x-1">
            <div className="relative font-poppins">
              
            </div>
            <ul className="flex items-center gap-4">
                <li className="navbar"> <NavLink to={"/"}>Home</NavLink> </li>
                <li className="navbar"><NavLink to={"/all-trainers"}>All Trainer</NavLink></li>
                <li className="navbar"><NavLink to={"all-classes"}> Classes </NavLink></li>
                <li className="navbar"><NavLink to={"/Forums"}>Forums</NavLink></li>
                <li className="navbar"><NavLink to={"/About us"}>About us</NavLink></li>
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
                  <button className="bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10">
                        Log in
                    </button>
                </Link>
            }
                        
                <div className={`${profileMenu? "block": "hidden "} absolute top-[100%] right-1 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                    <CurrentUserInfo setProfileMenu={setProfileMenu}/>
                   
                </div>
          <button onClick={()=> setOpenMenu(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <CiMenuFries/>
          </button>
            
          </div>
        </div>
        {
            openMenu && <MobileMenu/>
        }
        
      </div>
    </nav>
  );
};

export default Navbar;
