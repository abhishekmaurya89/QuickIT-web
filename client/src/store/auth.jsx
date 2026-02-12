/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const storetokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  const authToken=`Bearer ${token}`;

  const userAuthentication = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.user);
        setUser(data.user);
        setisLoading(false);
      } else {
        console.error("Auth failed: Invalid response");
        setisLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const getServices = async () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}/api/data/service`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("services data", data.services);
        setServices(data.services); 
      } else {
        console.error("Can't get services");
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    getServices();
    if (token) {
      userAuthentication();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ storetokenInLS, isLoggedIn, LogoutUser, user, services, authToken,isLoading }} 
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside the provider");
  }
  return authContextValue;
};
