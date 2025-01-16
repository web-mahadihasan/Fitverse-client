import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../config/firebase.config";

export const AuthProviderContext = createContext(null)

const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const google = new GoogleAuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Create user 
    const registerNewUser = (email, password) =>  {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Login user
    const loginWithEmail = (email, password) =>  {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    } 
    // Google Login / Register 
    const loginWithGoogle = () =>  {
        setLoading(true)
        return signInWithPopup(auth, google)
    }
    // Updata user 
    const updataUser = (updataData) =>  {
        return updateProfile(auth.currentUser, updataData)
    }
     // Log out user 
     const logOutUser = () => {
        return signOut(auth);
    }
    // Forgot password
    const resetPassword = (email) =>  {
        return sendPasswordResetEmail(auth, email)
    }
     // on Auth state change 
     useEffect(() =>  {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) =>  {
            if(currentUser?.email){
                // Generate token 
                // const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`, {email: currentUser?.email}, {withCredentials: true})
                setUser(currentUser)
            }else{
                // const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {withCredentials: true})
                // setLoginUser(false)
                setUser(currentUser)
            }
            setLoading(false)
        })

        return () =>  {
            unsubscribe()
        }
    }, [auth])

    const authInfo = {
        registerNewUser,
        loginWithEmail,
        loginWithGoogle,
        updataUser,
        logOutUser,
        resetPassword,
        user, 
        setUser,
        loading
    }
    return (
        <AuthProviderContext.Provider value={authInfo}>
            {children}
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider;