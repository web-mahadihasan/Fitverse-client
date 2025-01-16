import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login/Login';
import Registration from '../pages/Auth/Register/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import AllNewsLetter from '../pages/Dashboard/AllNewsLetter/AllNewsLetter';
import AppliedTrainer from '../pages/Dashboard/AppliedTrainer/AppliedTrainer';
import AllTrainer from '../pages/Dashboard/AllTriner/AllTrainer';
import AddNewClass from '../pages/Dashboard/AddNewClass/AddNewClass';
import BeATrainer from '../pages/BeATriner/BeATriner';
import BeATrainerCopy from '../pages/BeATriner/copy';
import Copy2 from '../pages/BeATriner/Copy2';
import TrainerApplication from '../pages/TrainerApplication/TrainerApplication';
import AllTrainers from '../pages/AllTrainers/AllTrainers';


const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/auth/login",
                element: <Login/>
            },
            {
                path: "/auth/register",
                element: <Registration/>
            },
            {
                path: "/trainer-application",
                element: <TrainerApplication/>
            },
            {
                path: "/all-trainers",
                element: <AllTrainers/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                path: "/dashboard",
                element: <DashboardHome/>,
            },
            {
                path: "/dashboard/all-newsletter",
                element: <AllNewsLetter/>,
            },
            {
                path: "/dashboard/applied-trainer",
                element: <AppliedTrainer/>,
            },
            {
                path: "/dashboard/all-trainer",
                element: <AllTrainer/>,
            },
            {
                path: "/dashboard/add-news-class",
                element: <AddNewClass/>,
            }
        ]
    }
])

export default Router;