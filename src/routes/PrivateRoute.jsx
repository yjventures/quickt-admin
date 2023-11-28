import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { Alert, LinearProgress } from "@mui/material";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(user?.token)
    if (loading) {
        return <LinearProgress />
    }
    
    // if (user?.isAdmin != true) {
    //     return <div style={{
    //         maxWidth: '1200px',
    //         margin: '0 auto'
    //     }}>
    //         <Alert severity="warning">Unauthorized login detected. We are humbly requesting you for not interrupting system. We may take legal action.</Alert>
    //     </div>
    // }
    // if(user?.token){
    //     return children;
    // }
    if (user?.isAdmin == true) {
        return children;
    }


    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
