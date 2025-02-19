import { RiArrowRightSLine, RiCloseLargeLine } from "react-icons/ri";
import logo from "../../../assets/icon/Fitness-log.png"
import { Link, NavLink } from "react-router";
import { GoArrowRight } from "react-icons/go";
import useApp from "../../../hooks/useApp";
import userIcon  from "../../../assets/icon/user.png"
import useAuth from "../../../hooks/useAuth";
import {motion} from "framer-motion"

const MobileMenu = () => {
    const {openMenu, setOpenMenu} = useApp()
    const {user} = useAuth()
    
  
    return (
        <motion.div className={`absolute lg:hidden z-40 duration-1000 shadow-xl transition-all min-h-[90vh] bg-white ${ openMenu? "top-0 right-0 block" : "right-800px"}`}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="menu flex flex-col justify-between bg-white dark:bg-[#212529] text-base-content min-h-screen w-72 overflow-y-scroll">
            {/* Sidebar content here */}
                <div className="flex items-center justify-between h-20 shadow-lg px-2">
                    <div className="flex items-center gap-2">
                        <Link to={"/"}><img src={logo} alt="Job Peak" className="h-10 md:h-12"/></Link>
                    </div>
                    {/* Menu Close  */}
                    <button onClick={() => setOpenMenu(false)} className="p-2 border border-black/65 cursor-pointer rounded-full dark:border-white/85">
                        <RiCloseLargeLine size={22} className=""/>
                    </button>
                </div>

                {/* Nav Links  */}
                <div className="mt-6 p-4">
                    <ul className="flex flex-col gap-1 space-y-6">
                        <li>
                            <NavLink to="/" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>Home <GoArrowRight size={22} className="text-gray-500"/></NavLink>
                        </li> 
                        <li>
                            <NavLink to="/all-classes" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>All Classes <GoArrowRight size={22} className="text-gray-500"/></NavLink>                            
                        </li> 
                        <li>
                            <NavLink to="/all-trainers" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>All Trainers <GoArrowRight size={22} className="text-gray-500"/></NavLink>
                        </li> 
                        <li>
                            <NavLink to="/forums" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>Forums <GoArrowRight size={22} className="text-gray-500"/></NavLink>
                        </li> 
                        <li>
                            <NavLink to="/about-us" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>About us <GoArrowRight size={22} className="text-gray-500"/></NavLink>
                        </li> 
                        <li>
                            <NavLink to="/contact-us" className={"font-normal text-[15px] text-[#100C08] dark:text-white uppercase flex justify-between"}>Contact us <GoArrowRight size={22} className="text-gray-500"/></NavLink>
                        </li> 
                        
                    </ul>
                </div>

                {/* User Log in & register  <NavUserInfo/>*/}
                {
                    user ? <div className="m-3 md:hidden p-6">
                        <img className="w-10 h-10 rounded-full ring-2 ring-main ring-offset-2 ring-offset-white" src={user?.photoURL || userIcon} alt="user photo"/>
                    </div> : (<div className="p-4 pb-6 text-center">
                        <Link to={"/auth/login"}>
                        <button className="font-poppins mx-auto text-center bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10">
                              Log in
                          </button>
                      </Link>
                    </div>)
                }
               
            </div>
        </motion.div>
    );
};

export default MobileMenu;
