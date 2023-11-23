import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log(user)
    const [showForm, setShowForm] = useState('');
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('jwt') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

    useEffect(() => {
        if (token && userId) {
            fetchUserData(token, userId);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserData = async (token, userId) => {
        try {
            const response = await axios.get(`https://api.quickt.com.au/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)
            const { first_name, email, isAdmin } = response.data;
            // set user
            setUser({ name, email, isAdmin, userId, token });
        } catch (error) {
            console.warn("Error fetching user data:", error);
        }
        setLoading(false); // Set loading state after fetching user data
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await axios.post("https://api.quickt.com.au/api/auth/local", {
                identifier: email,
                password: password,
            })
                .then(async response => {
                    console.log(response.data)
                    if (response.data) {
                        localStorage.setItem("jwt", response.data.jwt);
                        localStorage.setItem("user_id", response.data.user.id);
                        await fetchUserData(response.data.jwt, response.data.user.id);
                    } else {
                        showFailedAlert("Invalid Credentials");
                    }
                })
                .catch(error => {
                    console.log('Error:', error)
                    alert("Invalid Credentials");
                });
            // const response = await axios.post('https://api.quickt.com.au/api/auth/local', {
            //     identifier: email,
            //     password: password,
            // });

            // if (response.data.status === 200) {
            //     const data = response.data;
            //     localStorage.setItem('jwt', data.jwt);
            //     localStorage.setItem('userId', data.data._id);
            //     setToken(data.jwt);
            //     setUserId(data.data._id)
            //     await fetchUserData(data.jwt, data.data._id);
            // } else {
            //     throw new Error(response.data.message);
            // }
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        // invalidate token
        fetch(`http://localhost:5000/logout?jwt=${token}`,)
            .then(res => res.json())
            .then(data => console.log(data))
        setUser(null);
    };


    const handleForm = (text) => {
        setShowForm(text)
    }

    const authInfo = {
        user,
        loading,
        login,
        logout,
        handleForm,
        showForm
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
