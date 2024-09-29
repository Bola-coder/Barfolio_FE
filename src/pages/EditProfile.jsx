/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";

const EditProfile = ({ isOpen, onClose }) => {
  const { user, updateUser, loading } = useUserContext();
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");

  const handleSubmit = () => {
    updateUser({ firstname, lastname });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily={"IBM Plex Sans"}>
          Edit your profile
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={"20px"} fontFamily={"IBM Plex Sans"}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </FormControl>
          </VStack>

          {/* Save Button */}
          <ModalFooter>
            <Button
              colorScheme="primary"
              px={8}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
