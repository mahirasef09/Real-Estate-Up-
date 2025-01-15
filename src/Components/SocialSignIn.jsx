import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialSignIn = () => {
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
                    // setLoading(false);
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