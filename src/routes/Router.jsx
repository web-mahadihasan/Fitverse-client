import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login/Login';
import Registration from '../pages/Auth/Register/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import AllNewsLetter from '../pages/Dashboard/AllNewsLetter/AllNewsLetter';
import AppliedTrainer from '../pages/Dashboard/AppliedTrainer/AppliedTrainer';
import AddNewClass from '../pages/Dashboard/AddNewClass/AddNewClass';
import TrainerApplication from '../pages/TrainerApplication/TrainerApplication';
import AllTrainers from '../pages/AllTrainers/AllTrainers';
import TrainerDetails from '../pages/TrainerDetails/TrainerDetails';
import PrivateRoute from './privateRoute';
import ManageSlot from '../pages/Dashboard/TrainerDashboard/ManageSlot/ManageSlot';
import AddNewSlot from '../pages/Dashboard/TrainerDashboard/AddNewSlot/AddNewSlot';
import AddNewForum from '../pages/Dashboard/AddNewForum/AddNewForum';
import DashboardAllTrainer from '../pages/Dashboard/AllTriner/DashboardAllTrainer';
import SlotDetailsWithPayment from '../pages/SlotDetailsWithPayment/SlotDetailsWithPayment';
import AllClass from '../pages/AllClass/AllClass';
import ActivityLog from '../pages/Dashboard/UserDashboard/ActivityLogs/ActivityLog';
import Payment from '../pages/Payment/Payment';
import TestPayment from '../pages/Payment/TestPayment';
import UserPaymentHistory from '../pages/Dashboard/UserDashboard/UserPaymentHistory/UserPaymentHistory';
import PaymentPage from '../pages/Payment/Payment';


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
                path: "/trainer-details/:id",
                element: <TrainerDetails/>
            },
            {
                path: "/slot-details/:id",
                element: <SlotDetailsWithPayment/>,
                loader: () => fetch('/pricing.json')
            },
            {
                path: "/all-classes",
                element: <AllClass/>
            },
            {
                path: "/booked-slot/payment/:id",
                element: <PaymentPage/>
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
                element: <DashboardAllTrainer/>,
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
            },
            {
                path: "/dashboard/common/post-forum",
                element: <AddNewForum/>,
            },
            {
                path: "/dashboard/user/activity-log",
                element: <ActivityLog/>,
            },
            {
                path: "/dashboard/user/payment-history",
                element: <UserPaymentHistory/>,
            }
        ]
    }
])

export default Router;