import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialSignIn from "../../Components/SocialSignIn";
import Lottie from "lottie-react";
import SignUpLottie from "../../assets/SignUp.json"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createNewUser, updateUserProfile, setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = data => {
        
        createNewUser(data.email, data.password)
            .then(result => {
                const currentUser = result.user;
                
                setUser(currentUser);
                updateUserProfile({displayName: data.name, photoURL: data.photoURL})
                    .then(() => {
                        // create user in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Sign Up successful.',
                                        showConfirmButton: false,
                                        timer: 2500
                                    });
                                    navigate('/');
                                }
                            })
                            // .catch((err) => {
                            //     Swal.fire({
                            //         title: 'Error!',
                            //         text: err.message,
                            //         icon: 'error',
                            //         confirmButtonText: 'Oops'
                            //     });
                            // })
                    })
                    .catch(error => {
                        reset();
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'Oops'
                        });
                    })
            })
    };

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Real Estate Up | Sign Up</title>
            </Helmet>
            <div className="bg-white dark:bg-black flex justify-center items-center">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie animationData={SignUpLottie}></Lottie>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <input type="text"  {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <input type="email"  {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="relative form-control">
                                <input type={showPassword ? "text" : "password"} {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="Password" className="input input-bordered" />

                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase, one Lower case, one Number and one Special Character.</p>}

                                <p
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='btn btn-xs absolute right-4 top-3'>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </p>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-green-500" type="submit" value="Sign Up" />
                            </div>
                            <SocialSignIn></SocialSignIn>
                        </form>
                        <p className='text-center text-xs font-semibold mb-5'>Already Have An Account ? <Link className='text-green-500' to={"/signIn"}>Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;