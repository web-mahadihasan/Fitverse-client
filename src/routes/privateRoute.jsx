import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    
    const {user, loading} = useAuth()
    
    if(loading) {
        return <p className='text-3xl font-inter'>Loading...</p>
    }
    if(user) {
        return children;
    }
    return <Navigate to="/auth/login" state={{from: location}} replace></Navigate>
    
};

export default PrivateRoute;