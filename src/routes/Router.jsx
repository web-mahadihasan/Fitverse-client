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
import BookedTrainer from '../pages/Dashboard/UserDashboard/BookedTrainer/BookedTrainer';
import UserProfile from '../pages/Dashboard/UserDashboard/UserProfile/UserProfile';
import AboutUs from '../pages/AboutUs/AboutUs';
import ContactUs from '../pages/ContactUs/ContactUs';
import Balance from '../pages/Dashboard/AdminDashboard/Balance/Balance';
import ApplicantDetails from '../pages/Dashboard/AdminDashboard/ApplicantDetails/ApplicantDetails';
import AdminRoute from './AdminRoute';
import TrainerRoute from './TrainerRoute';
import Forums from '../pages/Forums/Forums';
import BlogDetails from '../pages/BlogDetails/BlogDetails';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import HelpPage from '../pages/HelpPage/HelpPage';


const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
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
                element: <PrivateRoute><SlotDetailsWithPayment/></PrivateRoute>,
                loader: () => fetch('/pricing.json')
            },
            {
                path: "/all-classes",
                element: <AllClass/>
            },
            {
                path: "/booked-slot/payment/:id",
                element: <PrivateRoute><PaymentPage/></PrivateRoute>
            },
            {
                path: "/about-us",
                element: <AboutUs/>
            },
            {
                path: "/contact-us",
                element: <ContactUs/>
            },
            {
                path: "/forums",
                element: <Forums/>
            },
            {
                path: "/forums/details/:id",
                element: <BlogDetails/>
            },
            {
                path: "/helps",
                element: <HelpPage />
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
                path: "/dashboard/admin/all-newsletter",
                element: <AdminRoute ><AllNewsLetter/></AdminRoute>,
            },
            {
                path: "/dashboard/admin/applied-trainer",
                element: <AdminRoute ><AppliedTrainer/></AdminRoute>,
            },
            {
                path: "/dashboard/admin/balance",
                element:  <AdminRoute ><Balance/></AdminRoute>,
            },
            {
                path: "/dashboard/admin/all-trainer",
                element:  <AdminRoute ><DashboardAllTrainer/></AdminRoute>,
            },
            {
                path: "/dashboard/admin/add-news-class",
                element:  <AdminRoute ><AddNewClass/></AdminRoute>,
            },
            {
                path: "/dashboard/admin/applicant-details/:id",
                element: <AdminRoute ><ApplicantDetails /></AdminRoute>,
            },
            {
                path: "/dashboard/trainer/manage-slot",
                element: <TrainerRoute><ManageSlot/></TrainerRoute> ,
            },
            {
                path: "/dashboard/trainer/add-new-slot",
                element: <TrainerRoute><AddNewSlot/></TrainerRoute>,
            },
            {
                path: "/dashboard/common/post-forum",
                element: <AddNewForum/>,
            },
            {
                path: "/dashboard/user/activity-log",
                element: <ActivityLog/>
            },
            {
                path: "/dashboard/user/payment-history",
                element: <UserPaymentHistory/>,
            },
            {
                path: "/dashboard/user/booked-trainer",
                element: <BookedTrainer/>,
            },
            {
                path: "/dashboard/user/profile",
                element: <UserProfile/>,
            }
        ]
    }
])

export default Router;