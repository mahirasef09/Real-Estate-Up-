import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialSignIn = () => {
    const {signInUserWithGoogle, setUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleSignIn = () => {
            signInUserWithGoogle()
                .then(result => {
                    const currentUser = result.user;
                    // console.log(currentUser);
                    setUser(currentUser);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Login Successful with Google',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    navigate(location?.state ? location.state : "/");
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error!',
                        text: err.message,
                        icon: 'error',
                        confirmButtonText: 'Oops'
                    });
                })
        }

    return (
        <div>
            <div className="divider">or</div>
            <div className="form-control">
                <button
                    onClick={handleGoogleSignIn}
                    className="btn bg-gray-200"><FcGoogle />Continue with Google</button>
            </div>
        </div>
    );
};

export default SocialSignIn;