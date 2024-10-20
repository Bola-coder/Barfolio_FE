import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useCollectionContext } from "../contexts/CollectionContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import curveCardBg from "./../assets/curveCardBg.png";

const PublicCollectionDetails = () => {
  const { loading, publicCollectionDetails, fetchPublicCollectionDetails } =
    useCollectionContext();
  const { id } = useParams();

  useEffect(() => {
    fetchPublicCollectionDetails(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading || !publicCollectionDetails) {
    return (
      <Flex
        maxW="1000px"
        justifyContent={"center"}
        alignItems={"center"}
        mx="auto"
        p="6"
        fontFamily={"IBM Plex Sans"}
        minH="70vh"
      >
        <Spinner size={"lg"} color="primary.500" />
      </Flex>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p="4" fontFamily={"IBM Plex Sans"} minH="70vh">
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        mb="6"
        color="primary.500"
        fontFamily={"IBM Plex Sans"}
      >
        {publicCollectionDetails?.title || "Collection Title"}
      </Heading>
      <Text textAlign="center" mb="6">
        {publicCollectionDetails?.description || "Collection Description"}
      </Text>

      <Flex
        gap={{ base: 4, md: 8 }}
        justifyContent="center"
        flexWrap="wrap"
        mt={{ base: 6, md: 8 }}
      >
        {publicCollectionDetails?.linkCollection?.map(
          (section, sectionIndex) => (
            <Card
              key={sectionIndex}
              variant="outline"
              boxShadow="lg"
              backgroundColor="primary.300"
              _hover={{ boxShadow: "xl" }}
              position="relative"
              overflow="hidden"
              w={{ base: "100%", sm: "350px" }}
              mx="auto"
            >
              <Box>
                {/* Background image at the top of the card */}
                <Image
                  src={curveCardBg}
                  alt="Background Image"
                  width="100%"
                  height="150px" // Adjust this height according to the design
                  objectFit="cover"
                  borderTopRadius="md"
                />

                <Box
                  p="6"
                  zIndex={"2"}
                  width={"130px"}
                  height={"130px"}
                  mx={"auto"}
                  position="absolute"
                  top="14%"
                  left="50%"
                  transform="translateX(-50%)"
                  padding={2}
                  borderRadius="50%"
                  backgroundColor={"primary.300"}
                >
                  <Box
                    width={"100%"}
                    height={"100%"}
                    padding={"5px"}
                    borderRadius="50%"
                    backgroundColor={"#FFF"}
                  >
                    <Image
                      src={section.image}
                      alt="Section Image"
                      width="100%"
                      height="100%"
                      borderRadius="50%"
                      objectFit="cover"
                    />
                  </Box>
                </Box>
              </Box>

              <CardHeader
                color="primary.500"
                zIndex="1"
                mt="18%"
                textAlign="center"
              >
                <Heading size="md" fontFamily={"IBM Plex Sans"}>
                  {section.header}
                </Heading>
                {section?.contact && <Text mt={"4%"}>{section?.contact}</Text>}
              </CardHeader>

              <CardBody zIndex="1">
                <VStack spacing={4} align="stretch">
                  {section.links.map((link, linkIndex) => (
                    <Button
                      key={linkIndex}
                      as="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      backgroundColor="white"
                      color={"primary.500"}
                      variant="solid"
                      width="100%"
                    >
                      {link.title}
                    </Button>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          )
        )}
      </Flex>
    </Box>
  );
};

export default PublicCollectionDetails;
