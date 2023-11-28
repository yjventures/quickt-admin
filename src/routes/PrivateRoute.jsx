import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { Alert, LinearProgress } from "@mui/material";
import useAuth from "../hook/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    // console.log(user, 'user')
    if (loading || user == null) {
        return <>
            <Alert severity="warning">Please wait untill we check security threat || If it takes too long, check your internet please || If it takes more than 5 min, probably you are an imposter :D </Alert>
            <LinearProgress />
        </>
    }

    if (user?.isAdmin == true) {
        return children;
    }


    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
