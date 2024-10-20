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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import useShowPassword from "../hooks/useShowPassword";

const Signup = () => {
  const navigate = useNavigate();
  const { showPassword, handleShowPassword } = useShowPassword();
  const { signup, isAuthenticated } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      phoneNumber: Yup.string()
        .matches(/^\d{11}$/, "Invalid phone number (11 digits)")
        .required("Phone number is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setButtonLoading(true);
      await signup(
        values.email,
        values.firstname,
        values.lastname,
        values.password,
        values.phoneNumber
      );
      // formik.resetForm();
      setButtonLoading(false);
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
        textAlign={{ base: "center", md: "left" }}
      >
        Signup to Barfolio
      </Text>
      <Text
        as={"p"}
        fontSize={{ base: "14px", sm: "16px" }}
        fontWeight={400}
        mb={{ base: "10px", sm: "20px" }}
        color={"#FFF"}
        textAlign={{ base: "center", md: "left" }}
      >
        Create your account to get started with making your link portfolio.
      </Text>
      <Box p={6} borderRadius="md" bg="white" boxShadow="md">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              variant={"filled"}
              type="text"
              focusBorderColor="primary.300"
              name="firstname"
              id="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <Text color="red">{formik.errors.firstname}</Text>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              variant={"filled"}
              type="text"
              focusBorderColor="primary.300"
              name="lastname"
              id="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <Text color="red">{formik.errors.lastname}</Text>
            )}
          </FormControl>
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
          <FormControl mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              variant={"filled"}
              type="text"
              focusBorderColor="primary.300"
              name="phoneNumber"
              id="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Text color="red">{formik.errors.phoneNumber}</Text>
            )}
          </FormControl>
          <Flex justifyContent={{ base: "center", md: "flex-end" }}>
            <Button
              mt={6}
              colorScheme="primary"
              type="submit"
              width={{ base: "100%", md: "auto" }}
            >
              {buttonLoading ? (
                <Spinner color="white" size={"md"} />
              ) : (
                <Text>Register</Text>
              )}
            </Button>
          </Flex>
        </form>
        <Box
          mt={8}
          display={"flex"}
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          <Text
            as="p"
            fontWeight={500}
            fontSize={{ base: "16px", sm: "18px", md: "20px" }}
            textAlign={{ base: "center", md: "right" }}
          >
            Already have an account?{" "}
            <Text as={"span"} color={"primary.500"} fontWeight={600}>
              <Link to={"/login"}>Login</Link>
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
