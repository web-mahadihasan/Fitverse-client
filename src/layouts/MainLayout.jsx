import { Outlet, useLocation } from "react-router";
import { Footerdemo } from "@/components/ui/footer-section";
import "../Style/App.css"
import Navbar from "../components/shared/Navbar/Navbar";
import TestNav from "../components/shared/Navbar/TestNav";
import { Toaster } from "react-hot-toast";
// import 'antd/dist/reset.css';

const MainLayout = () => {
    const {pathname} = useLocation()
    return (
        <div className="">
            <Toaster />

            {
                pathname !== "auth/login" || pathname !== "auth/register" ? <div className="min-h-16">
                <TestNav/>
            </div> : ""
            }
           
            
            {/* Main content  */}
            <main className="container mx-auto min-h-[calc(100vh-450px)]">
                <Outlet/>
            </main>

            {/* Footer  */}
            {
                pathname !== "auth/login" || pathname !== "auth/register" ?  <footer>
                <Footerdemo />
            </footer> : ""
            }
           
        </div>
    );
};

export default MainLayout;

{/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Meteors
      </span> */}