/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/user/profile`, {
        withCredentials: true,
      });
      const user = response.data.data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      toast({
        title: "Error fetching user profile",
        description: error.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${apiUrl}/user/profile`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      const updatedUser = response.data.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({ title: "Profile updated", status: "success" });
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePicture = async (file) => {
    setLoading(true);
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.patch(
        `${apiUrl}/user/profile-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      const updatedUser = response.data.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({ title: "Profile picture updated", status: "success" });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating picture",
        description: error.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const values = {
    user,
    getUserDetails,
    updateUser,
    updateProfilePicture,
    loading,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;
