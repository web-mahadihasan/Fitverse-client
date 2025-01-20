import * as React from "react"
import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar/DashboardSidebar";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Moon,  Sun, } from "lucide-react"

const DashboardLayout = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false)
  
    React.useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }, [isDarkMode])

    return (
        <div>
            <div className="grid grid-cols-5 min-h-screen">
                {/* Sidebar  */}
                <div className="h-screen  sticky top-0">
                    <DashboardSidebar/>
                </div>
                
                {/* Content section  */}
                <main className="col-span-4 content overflow-y-auto ">
                    {/* dashboard nav  */}
                    <div className="h-14 shadow-md sticky top-0 bg-base-100">
                       <nav className="flex items-center justify-between h-full max-w-[90%] mx-auto">
                            <div></div>
                            <div className="flex items-center space-x-2">
                                <Sun className="h-4 w-4" />
                                <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                                <Moon className="h-4 w-4" />
                                <Label htmlFor="dark-mode" className="sr-only">
                                    Toggle dark mode
                                </Label>
                            </div>
                       </nav>
                    </div>
                    <section className="w-full">
                        <Outlet/>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;