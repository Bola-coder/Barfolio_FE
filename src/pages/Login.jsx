import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Spinner,
  //   useToast,
  //   Select,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import useShowPassword from "../hooks/useShowPassword";

const Login = () => {
  //   const toast = useToast();
  const navigate = useNavigate();
  const { showPassword, handleShowPassword } = useShowPassword();
  const { login, isAuthenticated } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setButtonLoading(true);
      await login(values.email, values.password);
      //   formik.resetForm();
    },
  });
  return (
    <Box
      padding={{ base: "5%", sm: "3%" }}
      fontFamily={"IBM Plex Sans"}
      width={{ base: "100%", sm: "90%", md: "50%" }}
      margin={"auto"}
      marginTop={{ base: "20%", md: "10%" }}
      bg={"primary.500"}
      borderRadius={"12px"}
    >
      <Text
        as={"h2"}
        fontSize={{ base: "16px", sm: "20px" }}
        fontWeight={500}
        mb={"10px"}
        color={"#FFF"}
        textAlign={"left"}
      >
        Login to Barfolio
      </Text>
      <Text
        as={"p"}
        fontSize={{ base: "14px", sm: "16px" }}
        fontWeight={400}
        mb={{ base: "10px", sm: "20px" }}
        color={"#FFF"}
        textAlign={"left"}
      >
        Login to your account and continue managing your link portfolio.
      </Text>
      <Box p={6} borderRadius="md" bg="white" boxShadow="md">
        <form onSubmit={formik.handleSubmit}>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              variant={"filled"}
              type="text"
              focusBorderColor="primary.300"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //   required
            />
            {formik.touched.email && formik.errors.email && (
              <Text color="red">{formik.errors.email}</Text>
            )}
          </FormControl>
          <FormControl mt={4} position={"relative"}>
            <FormLabel>Password</FormLabel>
            <Input
              variant={"filled"}
              type={showPassword ? "text" : "password"}
              focusBorderColor="primary.300"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //   required
            />
            <Button
              position={"absolute"}
              right={"10px"}
              top={"30px"}
              bg={"transparent"}
              _hover={{ bg: "transparent" }}
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <FaEyeSlash color="gray" />
              ) : (
                <FaEye color="gray" />
              )}
            </Button>
            {formik.touched.password && formik.errors.password && (
              <Text color="red">{formik.errors.password}</Text>
            )}
          </FormControl>

          <Flex justifyContent={"flex-end"}>
            <Button mt={6} colorScheme="primary" type="submit">
              {buttonLoading ? (
                <Spinner color="white" size={"md"} />
              ) : (
                <Text>Login</Text>
              )}
            </Button>
          </Flex>
        </form>
        <Box
          mt={8}
          display={"flex"}
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          {" "}
          <Text
            as="p"
            fontWeight={500}
            fontSize={{ base: "16px", sm: "18px", md: "20px" }}
            textAlign={{ base: "center", md: "right" }}
          >
            Don&apos;t have an account?{" "}
            <Text as={"span"} color={"primary.500"} fontWeight={600}>
              <Link to={"/register"}>Register</Link>
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
