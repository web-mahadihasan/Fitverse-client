import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useTrainer from '../hooks/useTrainer';
import AnimatedLoader from '../pages/Loading/Loading';

const TrainerRoute = ({children}) => {
    const location = useLocation();
    const [isTrainer, isTrainerLoading] = useTrainer()
    
    const {user, loading} = useAuth()
    
    if(loading || isTrainerLoading) {
        return <AnimatedLoader/>
    }
    if(user && isTrainer) {
        return children;
    }
    return <Navigate to="/auth/login" state={{from: location}} replace></Navigate>
    
};

export default TrainerRoute;