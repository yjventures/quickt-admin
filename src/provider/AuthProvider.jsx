import React, { useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(user)
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [filterCountry, setFilterCountry] = useState({});
  const [filterSender, setFilterSender] = useState({});
  const [filterReceiver, setFilterReceiver] = useState({});
  const [filterRevenue, setFilterRevenue] = useState({});
  const [filterTransaction, setFilterTransaction] = useState({});
  const [filterPartner, setFilterPartner] = useState({});
  const [filteredName, setFilteredName] = useState('')


  useEffect(() => {
    if (token && userId) {
      fetchUserData(token, userId);
    } else {
      setLoading(false);
    }
  }, [userId, token]);

  const fetchUserData = async (token, userId) => {
    try {
      const response = await axios.get(
        `https://api.quickt.com.au/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const response = await axios.post(
        "https://api.quickt.com.au/api/auth/local",
        {
          identifier: email,
          password: password,
        }
      );

      if (response.data) {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("userId", response.data.user.id);
        const checkAdmin = await fetchUserData(
          response.data.jwt,
          response.data.user.id
        );
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
      isEnabled: text.isEnabled,
    });
  };

  // global checking for filter sender
  const handleFilterSender = (text) => {
    setFilterSender({
      filterMood: text.filterMood,
      from: text.from,
      to: text.to,
      isKyc: text.isKyc,
      isStatus: text.isStatus,
    });
  };

  const handleFilterReceiver = (text) => {
    setFilterReceiver({
      filterMood: text.filterMood,
      from: text.from,
      to: text.to,
    });
  };

  const handleFilterRevenue = (text) => {
    setFilterRevenue({
      filterMood: text.filterMood,
      from: text.from,
      to: text.to,
      isWhish: text.isWhish,
      isPartner: text.isPartner,
    });
  };
  const handleFilterTransaction = (text) => {
    setFilterTransaction({
      filterMood: text.filterMood,
      from: text.from,
      to: text.to,
      isTransferStatus: text.isTransferStatus,
      isPayoutStatus: text.isPayoutStatus,
    });
  };
  const handleFilterPartner = (text) => {
    setFilterPartner({
      filterMood: text.filterMood,
      from: text.from,
      to: text.to,
    });
  };

  const handleFilteredName = (text) => {
    setFilteredName(text)
  }
  const authInfo = {
    user,
    loading,
    login,
    handleFilterCountry,
    filterCountry,
    handleFilterSender,
    filterSender,
    handleFilterReceiver,
    filterReceiver,
    handleFilterRevenue,
    filterRevenue,
    handleFilterTransaction,
    filterTransaction,
    handleFilterPartner,
    filterPartner,
    handleFilteredName,
    filteredName
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
