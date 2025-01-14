import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import axios from 'axios';
import { auth } from '../Firebase/firebase.config';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(false);

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (updatedData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData)
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInUserWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const userLogout = () => {
        setLoading(true);
        Swal.fire({
            title: 'Success!',
            text: 'Log Out Successful',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                const user = { email: currentUser.email }

                axios.post('https://restaurant-management-server-flax.vercel.app/jwt', user, {withCredentials: true})
                .then(res => {
                    // console.log('login token',res.data);
                    setLoading(false);
                })
            }
            else{
                axios.post('https://restaurant-management-server-flax.vercel.app/logout', {}, {withCredentials: true})
                .then(res => {
                    // console.log('logout', res.data);
                    setLoading(false);
                })
            }

        });

        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        products,
        setProducts,
        user,
        setUser,
        loading,
        setLoading,
        state,
        setState,
        createNewUser,
        updateUserProfile,
        userLogin,
        signInUserWithGoogle,
        userLogout
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;