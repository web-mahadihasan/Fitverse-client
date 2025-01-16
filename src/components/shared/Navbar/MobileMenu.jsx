import { RiArrowRightSLine, RiCloseLargeLine } from "react-icons/ri";
import logo from "../../../assets/icon/Fitness-log.png"
import { Link, NavLink } from "react-router";
// import { LuPhoneCall } from "react-icons/lu";
import { GoArrowRight } from "react-icons/go";

// import useAppContext from "../../../hooks/useAppContext";
// import useAuth from "../../../hooks/useAuth";
import useApp from "../../../hooks/useApp";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const MobileMenu = () => {
    const {openMenu, setOpenMenu} = useApp()
    // const {user, loginUser} = useAuth()
    // console.log(user)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isCollapse, setIsCollapse] = useState(true)
    const user = false
  
    return (
        <div className={`absolute lg:hidden z-40 duration-700 ease-in-out min-h-[90vh] bg-white ${ openMenu? "top-0 right-0 block" : "bottom-5000px"}`}>
            <div className="menu flex flex-col justify-between bg-white dark:bg-[#212529] text-base-content min-h-screen w-72 p-4 overflow-y-scroll">
            {/* Sidebar content here */}
                <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-2">
                        <Link to={"/"}><img src={logo} alt="Job Peak" className="h-10 md:h-12"/></Link>
                    </div>
                    {/* Menu Close  */}
                    <button onClick={() => setOpenMenu(false)} className="p-2 border border-black/65 cursor-pointer rounded-full dark:border-white/85">
                        <RiCloseLargeLine size={22} className=""/>
                    </button>
                </div>

                {/* Nav Links  */}
                <div className="mt-6">
                    <ul className="flex flex-col gap-1 space-y-4">
                        <li>
                            <NavLink to="" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>Home <GoArrowRight size={22} className="text-gray-500"/></NavLink>
                        </li> 
                        <li>
                            <NavLink to="" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>All Trainer <GoArrowRight size={22} className="text-gray-500"/></NavLink>
                        </li> 
                        <li>
                            <button onClick={()=> setIsDropdownOpen(!isDropdownOpen)} className={"w-full font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>Classes <IoIosArrowDown
                                className={`${isDropdownOpen ? "rotate-[180deg]" : "rotate-0"} ${isCollapse ? "inline" : "hidden"} transition-all duration-300 text-[1rem] text-gray-500`}/></button>
                            <ul className={`${isDropdownOpen ? "h-auto my-3 opacity-100 z-[1]" : "opacity-0 z-[-1] h-0"} ${isCollapse ? "inline" : "hidden"} transition-all duration-300  marker:text-blue-400 ml-[10px] flex flex-col gap-[3px] text-[1rem] text-gray-500`}>
                                <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">
                                    <Link>All Classes</Link>
                                </li>
                                <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">
                                    <Link>Classes</Link>
                                </li>
                                <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">
                                    <Link>Classes</Link>
                                </li>
                                <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">
                                    <Link>Class Name</Link>
                                </li>
                            </ul>
                        </li> 
                        <li>
                            <NavLink to="" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>Forums <GoArrowRight size={22} className="text-gray-500"/></NavLink>
                        </li> 
                        <li>
                            <NavLink to="" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>About us <GoArrowRight size={22} className="text-gray-500"/></NavLink>
                        </li> 
                        {/* {
                            navLinks.map(link =>  link?.protect ? user &&  <li key={link.element}>
                                <NavLink to={link.path} className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>{link.element} <GoArrowRight size={22}/></NavLink>
                            </li> :  <li key={link.element}>
                                <NavLink to={link.path} className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>{link.element} <GoArrowRight size={22}/></NavLink>
                            </li>)
                        } */}
                        {/* <li>
                            <button onClick={()=> setIsDropdownOpen(!isDropdownOpen)}>open</button>
                            <ul className={`${isDropdownOpen ? "h-auto my-3 opacity-100 z-[1]" : "opacity-0 z-[-1] h-0"} ${isCollapse ? "inline" : "hidden"} transition-all duration-300 list-disc marker:text-blue-400 ml-[35px] flex flex-col gap-[3px] text-[1rem] text-gray-500`}>
                                <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">Google</li>
                                <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">Facebook</li>
                                <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">Twitter</li>
                                <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">Linkedin</li>
                            </ul>
                        </li> */}
                    </ul>
                </div>

                {/* User Log in & register  <NavUserInfo/>*/}
                {
                    user ? <div className="m-3 md:hidden">hello</div> : (<div className="font-medium flex items-center md:hidden">
                        <Link to={"/auth/login"}><button className="px-5 py-1.5 bg-white text-primary rounded shadow-md border border-primary hover:bg-primary hover:text-white hover:border-primary duration-500">Login</button></Link>
                        <div className="mx-2 text-sm font-medium">OR</div>
                        <Link to={"/auth/register"}><button className="px-5 py-1.5 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500">Register</button></Link>
                    </div>)
                }
                {/* More query  */}
                {/* <div className="py-1">
                <div className="divider my-2"></div>
                    <div className="flex items-center gap-3">
                        <div className="px-2 border-r-2 border-gray-500">
                            <LuPhoneCall size={28} className="text-primary"/>
                        </div>
                        <div>
                            <p className="font-medium text-base">To More Inquery</p>
                            <h4 className="text-primary font-semibold text-lg">+8801794943980</h4>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default MobileMenu;
