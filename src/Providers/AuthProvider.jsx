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
        console.log(updatedData);
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData);
    }

    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInUserWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const userSignOut = () => {
        setLoading(true);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sign Out successful.',
            showConfirmButton: false,
            timer: 2500
        })
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
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
        userSignIn,
        signInUserWithGoogle,
        userSignOut
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