
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Pages/Loading";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate state={location.pathname} to={"/login"}></Navigate>
};

export default PrivateRoute;