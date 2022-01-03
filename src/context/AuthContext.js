import React,{createContext, useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

export function useAuth () {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logOut() {
        return auth.signOut()
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value ={
        currentUser,
        signUp, 
        logIn,
        logOut,
        resetPassword,
        
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}