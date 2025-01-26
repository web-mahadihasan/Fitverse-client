import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import AnimatedLoader from '../pages/Loading/Loading';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    
    const {user, loading} = useAuth()
    
    if(loading) {
        return <AnimatedLoader/>
    }
    if(user) {
        return children;
    }
    return <Navigate to="/auth/login" state={{from: location}} replace></Navigate>
    
};

export default PrivateRoute;