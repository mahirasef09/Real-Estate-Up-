import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    
    return (
        <div className='flex flex-col justify-center items-center space-y-3 p-5'>
            <img src="https://i.ibb.co.com/thgCz8D/404.png" alt="" />
            <h2 className='text-4xl font-bold text-red-500'>Page not found</h2>
            <p className='font-bold'>Error Message: {error.statusText || error.message}</p>
            <Link to="/"><button className='btn bg-green-500 btn-wide font-bold mt-5'>Go to Home</button></Link>
        </div>
    );
};

export default ErrorPage;