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
import TrainerApplication from '../pages/TrainerApplication/TrainerApplication';
import AllTrainers from '../pages/AllTrainers/AllTrainers';
import TrainerDetails from '../pages/TrainerDetails/TrainerDetails';
import PrivateRoute from './privateRoute';
import ManageSlot from '../pages/Dashboard/TrainerPage/ManageSlot/ManageSlot';
import AddNewSlot from '../pages/Dashboard/TrainerPage/AddNewSlot/AddNewSlot';


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
                element: <PrivateRoute><TrainerApplication/></PrivateRoute>
            },
            {
                path: "/all-trainers",
                element: <AllTrainers/>
            },
            {
                path: "/trainer-details",
                element: <TrainerDetails/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
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
            },
            {
                path: "/dashboard/trainer/manage-slot",
                element: <ManageSlot/>,
            },
            {
                path: "/dashboard/trainer/add-new-slot",
                element: <AddNewSlot/>,
            }
        ]
    }
])

export default Router;