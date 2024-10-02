/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../config/axios";
// import Cookies from "js-cookie";
// import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const toast = useToast({
    position: "top right",
    // variant: "subtle",
    duration: 3000,
    isClosable: true,
  });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
    }
    if (user) {
      setUser(JSON.parse(user));
    }

    const checkAuthStatus = async () => {
      await checkAuthenticationStatus();
    };

    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const signup = (email, firstname, lastname, password, phoneNumber) => {
    const body = {
      email,
      firstname,
      lastname,
      password,
      phoneNumber,
    };
    setLoading(true);
    axios
      .post(`${apiUrl}/auth/signup`, body, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setUser(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast({
          title: "Account created.",
          description: "You have successfully created an account.",
          status: "success",
        });
        navigate("/collections");
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.message) {
          toast({
            title: "An error occurred.",
            description: error.response.data.message,
            status: "error",
          });
        } else {
          toast({
            title: "An error occurred.",
            description: "Unable to create account. Please try again later.",
            status: "error",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  const login = async (email, password) => {
    setLoading(true);
    const body = {
      email,
      password,
    };

    axios
      .post(`${apiUrl}/auth/login`, body, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast({
          title: "Login successful.",
          description: "You have successfully logged in.",
          status: "success",
        });
        navigate("/collections");
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.message) {
          toast({
            title: "An error occurred.",
            description: error.response.data.message,
            status: "error",
          });
        } else {
          toast({
            title: "An error occurred.",
            description: "Unable to login. Please try again later.",
            status: "error",
          });
        }
      })

      .finally(() => setLoading(false));
  };

  const checkAuthenticationStatus = async () => {
    setLoading(true); // Ensure loading is set at the beginning
    axios
      .get(`${apiUrl}/auth/check-auth`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          //   console.log("Heyy true oo");
          setIsAuthenticated(true);
        } else {
          //   console.log("Heyy false ooo");
          // setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        // console.log("Heyy false ooo");
        console.error(error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false); // This should always be called
      });
  };

  const logout = async () => {
    axiosInstance
      .get(`/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
        toast({
          status: "success",
          description: "Logout successful",
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          status: "error",
          description: "Logout unsuccessful",
        });
      });
  };

  const values = {
    isAuthenticated,
    token,
    user,
    loading,
    signup,
    login,
    checkAuthenticationStatus,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
