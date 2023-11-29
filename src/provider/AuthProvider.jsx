import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const AuthContext = React.createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // console.log(user)
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('jwt') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [filterCountry, setFilterCountry] = useState({});
    
    useEffect(() => {
        if (token && userId) {
            fetchUserData(token, userId);
        } else {
            setLoading(false);
        }
    }, [userId, token]);

    const fetchUserData = async (token, userId) => {
        try {

            const response = await axios.get(`https://api.quickt.com.au/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { isAdmin } = response.data;
            // set user
            setUser({ isAdmin, userId, token });
            return { isAdmin, userId, token };
        } catch (error) {
            console.warn("Error fetching user data:", error);
        }
        setLoading(false); // Set loading state after fetching user data
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post("https://api.quickt.com.au/api/auth/local", {
                identifier: email,
                password: password,
            });

            if (response.data) {
                localStorage.setItem("jwt", response.data.jwt);
                localStorage.setItem("userId", response.data.user.id);
                const checkAdmin = await fetchUserData(response.data.jwt, response.data.user.id);
                console.log(checkAdmin);
                setLoading(false);
                return checkAdmin;
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    // global checking for filter country
    const handleFilterCountry = (text) => {
        setFilterCountry({
            filterMood: text.filterMood,
            from: text.from,
            to: text.to,
            isEnabled: text.isEnabled
        })

    }
    const authInfo = {
        user,
        loading,
        handleFilterCountry,
        filterCountry
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
