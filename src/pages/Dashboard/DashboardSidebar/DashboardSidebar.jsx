import { HiMenu } from 'react-icons/hi';
import { GoHome } from 'react-icons/go';
import { Icon } from '@iconify/react/dist/iconify.js';
import { PiListStarFill } from 'react-icons/pi';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { CiLogout } from 'react-icons/ci';
import { RiAccountCircleLine } from 'react-icons/ri';
import {BsThreeDots} from "react-icons/bs";
import { Divider } from 'antd';
import fitnessLogo from "../../../assets/icon/Fitness-log.png"
import useAdmin from '../../../hooks/useAdmin';
import useTrainer from '../../../hooks/useTrainer';
import toast from 'react-hot-toast';

const DashboardSidebar = ({setOpenSidebar, openSidebar}) => {
    const {user, logOutUser} = useAuth()
    const [isAdmin] = useAdmin()
    const [isTrainer] = useTrainer()
    

    const handleSignOut = async () => {
        const toastId = toast.loading('Logging in...');
        try {
            const result = await logOutUser()
                toast.success(`Successfully Logout!`, {
                    id: toastId, 
                });
                console.log(result)
        } catch (error) {
            toast.success(`Failed to Logout! Try again`, {
                id: toastId, 
              });
              console.log(error)
        }
    }

    const isCollapse = true;

    const addminRoutes = [
        {name: "All Trainer", path: "/dashboard/admin/all-trainer",  icon: <Icon icon="clarity:users-line" width="26" height="26" />},
        {name: "Applied Trainer", path: "/dashboard/admin/applied-trainer",  icon: <Icon icon="humbleicons:user-add" width="26" height="26" />},
        {name: "All Newsletter", path: "/dashboard/admin/all-newsletter",  icon: <Icon icon="ri:record-mail-line" width="26" height="26" />},
        {name: "Balance", path: "/dashboard/admin/balance",  icon: <Icon icon="grommet-icons:money" width="24" height="24" />},
        {name: "Add New Class",path: "/dashboard/admin/add-news-class",  icon: <PiListStarFill size={24} />},
    ]
    const trainerRoutes = [
        {name: "Manage Slot", path: "/dashboard/trainer/manage-slot",  icon: <Icon icon="mingcute:classify-2-line" width="26" height="26" />},
        {name: "Add New Slot", path: "/dashboard/trainer/add-new-slot",  icon: <Icon icon="mingcute:classify-add-2-line" width="26" height="26" />},
    ]
    const userRoutes = [
        {name: "Activity Logs", path: "/dashboard/user/activity-log",  icon: <Icon icon="hugeicons:activity-04" width="26" height="26" />},
        {name: "Profile Badge", path: "/dashboard/user/profile",  icon: <Icon icon="simple-line-icons:badge" width="26" height="26" />},
        {name: "Booked Trainer", path: "/dashboard/user/booked-trainer",  icon: <Icon icon="mdi:user-check-outline" width="26" height="26" />},
        {name: "Payment History", path: "/dashboard/user/payment-history",  icon: <Icon icon="iconamoon:history-light" width="26" height="26" />},
    ]
    const dashboardCommonLinks = [
        {name: "Home", path: "/", icon: <Icon icon="fluent:home-32-filled" width="26" height="26" />},
        {name: "Class", path: "/all-classes", icon: <Icon icon="mingcute:classify-3-line" width="26" height="26" />},
        {name: "Contact", path: "/contact-us", icon: <Icon icon="mdi-light:email" width="24" height="24" />}
    ]
    return (
        <div className={`min-h-screen border font-poppins flex flex-col justify-between h-full p-3 px-6 w-full dark:bg-yellow text-black/80 font-inter`}>
            <div className="space-y-6">
                <div className="relative">
                    <div className='flex items-center gap-2'>
                        <div className="relative">
                          <img src={fitnessLogo} alt="" className="h-9"/>
                        </div>
                        <span className="text-3xl lg:text-4xl font-gagalin tracking-wider font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#5A29E4] to-[#9F72F9]">
                          FitVerse
                        </span>
                    </div>
                    <div onClick={() => setOpenSidebar(false)} className='absolute -right-8 top-3'>
                        <Icon icon="octicon:sidebar-collapse-24" width="24" height="24" />
                    </div>
                </div>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center py-4">
                        <button type="submit" className="p-2 focus:outline-none focus:ring">
                            <svg fill="currentColor" viewBox="0 0 512 512" className="w-5 h-5 dark:text-gray-600">
                                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                            </svg>
                        </button>
                    </span>
                    <input type="search" name="Search" placeholder="Search..." className="w-full py-2 pl-10 text-sm dark:border- rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-800 focus:dark:bg-gray-50" />
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-3 text-sm">
                        <li className="rounded-sm dashboard text-base" >
                             <NavLink to={"/dashboard"} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md dark:text-gray-300">
                                 <span className=''><GoHome size={24} className='text-main'/></span>
                                 <span>Dashboard Home</span>
                             </NavLink>
                         </li>
                         {/* Admin Routes  */}
                        {
                           user && isAdmin && addminRoutes.map(link =>   
                                <li className="rounded-sm dashboard text-base" key={link.name}>
                                    <NavLink to={link.path} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md dark:text-gray-300">
                                        <span className='text-main'>{link.icon}</span>
                                        <span>{link.name}</span>
                                    </NavLink>
                                </li>
                            )
                        }
                        {/* Trainer Routes  */}
                        {
                           user && isTrainer && trainerRoutes.map(link =>   
                                <li className="rounded-sm dashboard text-base" key={link.name}>
                                    <NavLink to={link.path} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md dark:text-gray-300">
                                        <span className='text-main'>{link.icon}</span>
                                        <span>{link.name}</span>
                                    </NavLink>
                                </li>
                            )
                        }
                        {/* user Routes  */}
                        {
                           !isAdmin && !isTrainer && userRoutes.map(link =>   
                                <li className="rounded-sm dashboard text-base" key={link.name}>
                                    <NavLink to={link.path} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md dark:text-gray-300">
                                        <span className='text-main'>{link.icon}</span>
                                        <span>{link.name}</span>
                                    </NavLink>
                                </li>
                            )
                        }

                        {/* Forum routes */}
                        {
                            isAdmin || isTrainer ? <li className="rounded-sm dashboard text-base" >
                            <NavLink to={"/dashboard/common/post-forum"} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md dark:text-gray-300">
                                <span className='text-main'><Icon icon="material-symbols-light:post-add" width="26" height="26" /></span>
                                <span>Add new Forum</span>
                            </NavLink>
                        </li> : ""
                        }
                        <Divider plain className="text-gra" style={{
                                    borderColor: '#d1d5db',
                                    color: '#4b5563' 
                                }}
                        ></Divider>
                        {
                           dashboardCommonLinks.map(link =>   
                                <li className="rounded-base font-poppins" key={link.name}>
                                    <Link to={link.path} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md dark:text-gray-300">
                                        <span className='text-main'>{link.icon}</span>
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>

            {/* Profile iamge */}
            <div
                className={`${isCollapse ? "justify-between" : "justify-center"} bg-gray-100 py-3 px-[20px] flex items-center mt-10 dark:bg-gray-800`}>
                <div className="flex items-center gap-[10px]">
                    <img
                        src={user?.photoURL}
                        alt="avatar" className="w-[33px] h-[33px] cursor-pointer rounded-full object-cover"/>
                    <h3 className={`${isCollapse ? "inline" : "hidden"} text-[0.9rem] text-gray-800 font-[500] dark:text-white/80`}>{user?.displayName}</h3>
                </div>

                <div className={`${isCollapse ? "inline" : "hidden"} relative group`}>
                    <BsThreeDots className="text-[1.2rem] text-gray-500 cursor-pointer"/>

                    <ul className="translate-y-[20px] text-sm font-poppins font-normal h-20 opacity-0 justify-between z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 absolute bottom-0 left-[30px] bg-white boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px]">
                        <Link to={"/dashboard/user/profile"}>
                        <li className="flex items-center gap-[7px] text-gray-600 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer">
                            <RiAccountCircleLine/>
                            Profile
                        </li>
                        </Link>
                        <li onClick={handleSignOut} className="flex items-center gap-[7px] text-[0.9rem] text-red-500 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer">
                            <CiLogout/>
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            );
};

export default DashboardSidebar;