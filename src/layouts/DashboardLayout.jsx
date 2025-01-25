import * as React from "react"
import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar/DashboardSidebar";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Moon,  Sun, } from "lucide-react"
import { HiMenu } from "react-icons/hi";
import { useState } from "react";

const DashboardLayout = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
  
    React.useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }, [isDarkMode])

    return (
        <div className="w-full">
        <div className="lg:grid grid-cols-5 min-h-screen relative">
          {/* Sidebar */}
          <div
            className={`relative dark:bg-background dark:text-white lg:sticky top-0 z-50`}
          >
            <div
              className={`absolute z-40 bg-white w-[70%] md:w-[40%] ${
                openSidebar ? "left-0 top-0 min-h-screen" : "-left-3/4"
              } dark:bg-background lg:w-full lg:static lg:min-h-screen lg:block duration-700 transition-all`}
            >
              <DashboardSidebar
                setOpenSidebar={setOpenSidebar}
                openSidebar={openSidebar}
              />
            </div>
          </div>
      
          {/* Content section */}
          <main className="w-full lg:col-span-4 overflow-y-auto h-screen">
            {/* Dashboard nav */}
            <div className="h-14 shadow-md sticky top-0 bg-base-100 z-50 dark:bg-gray-800">
              <nav className="z-50 flex items-center justify-between h-full max-w-[95%] pl-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOpenSidebar(true)}
                    className="p-2 lg:hidden"
                  >
                    <HiMenu size={26} />
                  </button>
                  <h3 className="text-2xl font-kanit font-semibold px-4">
                    Dashboard
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <Switch
                    id="dark-mode"
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                  />
                  <Moon className="h-4 w-4" />
                  <Label htmlFor="dark-mode" className="sr-only">
                    Toggle dark mode
                  </Label>
                </div>
              </nav>
            </div>
            <section className="max-w-6xl mx-auto ">
              <Outlet />
            </section>
          </main>
        </div>
      </div>
      
    );
};

export default DashboardLayout;