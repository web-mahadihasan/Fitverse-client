import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../config/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthProviderContext = createContext(null)

const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const google = new GoogleAuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic() 

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
            setUser(currentUser)
            if(currentUser){
                // Generate token
                const userInfo = {email: currentUser.email}
                const {data} = await axiosPublic.post("/jwt", userInfo)
                if(data.token){
                    localStorage.setItem("access-token", data.token)
                }
                setLoading(false)
            }else{
                // remove token 
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })

        return () =>  {
            unsubscribe()
        }
    }, [auth, axiosPublic])

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