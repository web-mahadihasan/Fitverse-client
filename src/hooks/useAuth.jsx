import { useContext } from 'react';
import { AuthProviderContext } from '../context/AuthProvider';

const useAuth = () => {
    const context = useContext(AuthProviderContext)
    return context;
};

export default useAuth;