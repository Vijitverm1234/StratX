import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    const getAuthState = async () => {
        if (!backendUrl) {
            toast.error("Backend URL is missing.");
            return;
        }
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
            if (data.success) {
                setIsLoggedin(true);
                getUserData(); 
            } else {
                setIsLoggedin(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Authentication check failed");
        }
    };

    const getUserData = async () => {
        if (!backendUrl) {
            toast.error("Backend URL is missing.");
            return;
        }
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch user data");
        }
    };

    // Fetch authentication state on mount
    useEffect(() => {
        getAuthState();
    }, []);

    return (
        <AppContent.Provider
            value={{
                backendUrl,
                isLoggedin,
                userData,
                setIsLoggedin,
                setUserData,
                getUserData,
            }}
        >
            {props.children}
        </AppContent.Provider>
    );
};
