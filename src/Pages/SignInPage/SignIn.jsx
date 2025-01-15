import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import SocialSignIn from "../../Components/SocialSignIn";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import SignInLottie from "../../assets/SignIn.json"

const SignIn = () => {
    const { userSignIn, setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        userSignIn(email, password)
            .then((result) => {
                const currentUser = result.user;
                setUser(currentUser);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sign In successful.',
                    showConfirmButton: false,
                    timer: 2500
                });
                e.target.reset();
                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'Oops'
                });
                e.target.reset();
            });

    }


    return (
        <div>
            <Helmet>
                <title>Real Estate Up | Sign In</title>
            </Helmet>
            <div className='bg-white dark:bg-black flex justify-center items-center'>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie animationData={SignInLottie}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-lg shrink-0 p-10 rounded-3xl shadow-2xl">
                        <h3 className='text-2xl font-extrabold text-center'>Welcome Back!</h3>
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="relative form-control">
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="input input-bordered" required />
                                <p
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='btn btn-xs absolute right-4 top-3'>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-green-500">Get Started</button>
                            </div>
                            <SocialSignIn></SocialSignIn>
                        </form>
                        <p className='text-center text-xs font-semibold'>Don’t Have An Account ? <Link className='text-green-500' to={"/signUp"}>Sign Up</Link></p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignIn;