import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Badge,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCollectionContext } from "../contexts/CollectionContext";

const Home = () => {
  const { loading, collections, fetchCollections } = useCollectionContext();

  // Simulate fetching data
  useEffect(() => {
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !collections) {
    return (
      <Flex
        maxW="1000px"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        p="6"
        fontFamily="IBM Plex Sans"
      >
        <Spinner size="lg" color="primary.500" />
      </Flex>
    );
  }

  if (collections.length === 0) {
    return (
      <Flex
        maxW="1000px"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        p="6"
        fontFamily="IBM Plex Sans"
      >
        <Text
          textAlign="center"
          fontSize="lg"
          color="gray.600"
          fontFamily="IBM Plex Sans"
        >
          You have no collections at the moment
        </Text>
      </Flex>
    );
  }

  return (
    <Box p="6" maxW="1200px" mx="auto" fontFamily={"IBM Plex Sans"}>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb="6">
        <Heading
          as="h2"
          size={{ base: "sm", md: "lg" }}
          textAlign="center"
          fontFamily={"IBM Plex Sans"}
        >
          Your Collections
        </Heading>
        <Box>
          <Button
            borderColor="primary.500"
            color={"primary.500"}
            variant="outline"
            size={{ base: "sm", md: "lg" }}
          >
            <Link to={"/create"}>Create New</Link>
          </Button>
        </Box>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
        {collections.map((collection) => (
          <Box
            key={collection._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            bg="white"
            p="6"
            transition="all 0.2s ease-in-out"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
          >
            <VStack spacing="4" align="start">
              <Heading size="md" fontFamily={"IBM Plex Sans"}>
                {collection.title}
              </Heading>
              <Text color="gray.600" noOfLines={2}>
                {collection.description}
              </Text>

              <Box>
                <Badge colorScheme="blue" mr="2">
                  {collection.linkCollection.length} Sections
                </Badge>
                <Badge colorScheme="green">
                  {collection.linkCollection.reduce(
                    (totalLinks, section) => totalLinks + section.links.length,
                    0
                  )}{" "}
                  Links
                </Badge>
              </Box>

              <Button
                mt="4"
                colorScheme="primary"
                variant="solid"
                size="sm"
                alignSelf={"flex-end"}
              >
                <Link to={`/collection/${collection._id}`}>View Details</Link>
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
