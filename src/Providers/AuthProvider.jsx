import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '../Firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (updatedData) => {
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
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });

        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        properties,
        setProperties,
        user,
        setUser,
        loading,
        setLoading,
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