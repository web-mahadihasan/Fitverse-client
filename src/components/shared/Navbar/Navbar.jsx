import { Link, NavLink } from "react-router";
// import logo from "../../../assets/images/stayroom.png"
import { MdOutlineNotificationsActive } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
// import useAppContext from "../../../hooks/useAppContext";
// import MobileMenuAside from "./MobileMenuAside";
// import useAuth from "../../../hooks/useAuth";
// import CurrentUser from "./CurrentUser";
import { CiMenuFries } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import fitnessLogo from "../../../assets/icon/Fitness-log.png"
import fitnessLogo1 from "../../../assets/icon/icon1.png"

const Navbar = () => {
    // const {user, loginUser} = useAuth()
    // const {setOpenMenu} = useAppContext();
    const [openMenu, setOpenMenu] = useState(false)
    const user= false;

    const navLinks = <>
        <li> <NavLink to={"/"}>Home</NavLink> </li>
        <li><NavLink to={"/rooms"}>Rooms</NavLink></li>
        <li><NavLink to={"/my-bookings"}>My Bookings</NavLink></li>
        <li><NavLink to={"/about-us"}>About Us</NavLink></li>
        <li><NavLink to={"/contact-us"}>Contact Us</NavLink></li>
    </>
    return (
        <div className="">
            <div className="flex items-center justify-between container mx-auto">
                <div className="flex items-center">
                    <img src={fitnessLogo} alt="" className="h-10"/>
                    <h3 className="font-kanit text-4xl font-semibold">FitVerse</h3>
                </div>

                <div>
                    <ul className="flex items-center gap-4">
                        {navLinks}
                    </ul>
                </div>
                
                <div className="flex items-center gap-3">
                    <img src={fitnessLogo1} alt="" className="h-12 w-12 rounded-full"/>
                    <button>
                        <CiMenuFries/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;


{/* <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 z-40" id="navbar-user">
<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
<li>
    <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
</li>
<li>
    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
</li>
<li>
    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
</li>
<li>
    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
</li>
<li>
    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
</li>
</ul>
</div> */}


// <div className="container mx-auto px-4 xl:px-0 flex items-center justify-between">
//                 {/* Logo  */}
//                 <div>
//                     <Link to={"/"}><img src="" alt="Stay Rooms" className="h-10 md:h-12"/></Link>
//                 </div>

//                 {/* Nav links  */}
//                 <div className="hidden lg:block inset-x-0 bg-white/80 backdrop-blur-lg transition-all duration-300 ease-in-out border-b -translate-y-full opacity-0">
//                     <ul className="flex uppercase items-center text-sm font-medium text-secondary-black gap-4">
//                         {navLinks}
//                     </ul>
//                 </div>

//                 {/* Action button  */}
//                 <div className="flex items-center gap-2">
//                     {
//                         user ? <div className="flex items-center gap-3">
//                             <span className="p-2 border bg-white rounded-full cursor-pointer"><MdOutlineNotificationsActive size={23} className="text-primary"/></span>
//                             {/* <img src="" alt="" className="w-10 h-10 rounded-full"/> */}
//                             <details className="dropdown dropdown-end">
//                                 <summary className="btn p-0 bg-transparent hover:bg-transparent rounded-full flex items-center gap-2 border-gray-300 px-2">
//                                     <img src={user?.photoURL} alt="" className="w-9 h-9 rounded-full ring-2 ring-offset-2 ring-gray-100"/>
//                                     <IoIosArrowDown size={20} />
//                                 </summary>
//                                 <ul className="menu dropdown-content bg-white z-[1] p-2 min-w-60 space-y-2 border shadow-md rounded-md border-t-4 border-t-primary mt-3">
//                                     {/* <CurrentUser/> */}
//                                 </ul>
//                             </details>
//                         </div> : (<div className="hidden font-medium md:flex items-center">
//                         <Link to={"/auth/login"}><button className="px-5 py-1.5 bg-white text-primary rounded shadow-md border border-primary hover:bg-primary hover:text-white hover:border-primary duration-500">Login</button></Link>
//                         <div className="mx-2 text-sm font-medium">OR</div>
//                         <Link to={"/auth/register"}><button className="px-5 py-1.5 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 tracking-wide">Register</button></Link>
//                     </div>)
//                     }
//                     {/* Hamburger  */}
//                     <div onClick={() => setOpenMenu(!openMenu)} className="lg:hidden"><HiMenu size={30} /></div>
//                     <aside>
//                         {/* <MobileMenuAside/> */}
//                     </aside>
//                 </div>
//             </div>
            