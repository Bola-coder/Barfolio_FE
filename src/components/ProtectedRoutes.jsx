import { useState, useEffect } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { checkAuthenticationStatus, isAuthenticated, token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthenticationStatus = async () => {
      if (token) {
        try {
          await checkAuthenticationStatus();
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        navigate("/login");
      }
    };

    fetchAuthenticationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAuthenticated]);

  if (loading || isAuthenticated === null) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        <Spinner size="xl" color="primary" />
      </Flex>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;
