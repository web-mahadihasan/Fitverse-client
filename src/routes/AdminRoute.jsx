import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import AnimatedLoader from '../pages/Loading/Loading';

const AdminRoute = ({children}) => {
    const location = useLocation();
    const [isAdmin, isAdminLoading] = useAdmin()
    
    const {user, loading} = useAuth()
    
    if(loading || isAdminLoading) {
        return <AnimatedLoader/>
    }
    if(user && isAdmin) {
        return children;
    }
    return <Navigate to="/auth/login" state={{from: location}} replace></Navigate>
    
};

export default AdminRoute;