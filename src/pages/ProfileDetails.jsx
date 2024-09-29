import { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useUserContext } from "./../contexts/UserContext";
import EditProfile from "./EditProfile";

const ProfileDetails = () => {
  const { logout } = useAuth();
  const { user, getUserDetails } = useUserContext();

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      maxW="780px"
      mx="auto"
      mt={10}
      p={8}
      borderRadius="lg"
      bg="white"
      boxShadow="lg"
      fontFamily={"IBM Plex Sans"}
    >
      <Flex justifyContent={"space-between"}>
        <Box>
          <Heading mb={4} fontSize="2xl" fontFamily={"IBM Plex Sans"}>
            Profile Details
          </Heading>
          <Text color="gray.600" mb={6}>
            Add your details to create a personal touch to your profile.
          </Text>
        </Box>
        <Box>
          <Button
            borderColor="primary.500"
            color={"primary.500"}
            variant="outline"
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Flex>

      {/* Form Fields */}
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>First name</FormLabel>
          <Input value={user?.firstname || ""} readOnly />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Last name</FormLabel>
          <Input value={user?.lastname || ""} readOnly />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={user?.email || ""} readOnly />
        </FormControl>
      </VStack>

      {/* Save Button */}
      <Flex justify="flex-end" mt={8}>
        <Button colorScheme="primary" px={8} onClick={onOpen}>
          Edit
        </Button>
      </Flex>
      <EditProfile isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ProfileDetails;
