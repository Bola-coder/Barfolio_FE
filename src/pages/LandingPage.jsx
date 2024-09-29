import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  VStack,
} from "@chakra-ui/react";
import heroImage from "./../assets/heroImage.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box as="section" fontFamily={"IBM Plex Sans"}>
      {/* Hero Section */}
      <Flex
        as="section"
        bgGradient="linear(to-br, primary.500, primary.400)"
        color="white"
        py={20}
        px={{ base: 8, md: 20 }}
        align="center"
        direction={{ base: "column", md: "row" }}
      >
        <VStack spacing={6} flex="1" align="start">
          <Heading size="2xl" lineHeight="1.2" fontFamily={"IBM Plex Sans"}>
            Share Links Easily and Effortlessly
          </Heading>
          <Text fontSize="lg">
            Discover a simple way to organize, save, and share your favorite
            links with anyone, anytime.
          </Text>
          <Button colorScheme="whiteAlpha" size="lg" href="#cta">
            <Link to={"/collections"}>Start Sharing Now</Link>
          </Button>
        </VStack>
        <Box flex="1" mt={{ base: 8, md: 0 }}>
          <Image
            src={heroImage}
            alt="Link Sharing"
            width={"90%"}
            // borderRadius="lg"
            // boxShadow="lg"
          />
        </Box>
      </Flex>

      {/* Features Section */}
      <Box as="section" py={20} px={8}>
        <Heading textAlign="center" mb={12} fontFamily={"IBM Plex Sans"}>
          Why Choose Barfolio?
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={8}
        >
          {/* Feature 1 */}
          <VStack
            p={8}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            align="center"
          >
            <Box
              bg="primary.500"
              color="white"
              p={4}
              borderRadius="full"
              mb={4}
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="40"
                height="40"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7H7v6m0 0v6m6-6l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
            </Box>
            <Heading size="md" mb={2} fontFamily={"IBM Plex Sans"}>
              Instant Sharing
            </Heading>
            <Text color="gray.600" textAlign="center">
              Share your favorite content with just a few clicks, instantly and
              seamlessly.
            </Text>
          </VStack>

          {/* Feature 2 */}
          <VStack
            p={8}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            align="center"
          >
            <Box
              bg="primary.500"
              color="white"
              p={4}
              borderRadius="full"
              mb={4}
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="40"
                height="40"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m0 6v1m-4 4h8m-2 2h2m2 2h-8m-2 2h2m2 2H8m0-2H4m4 0h4"
                />
              </svg>
            </Box>
            <Heading size="md" mb={2} fontFamily={"IBM Plex Sans"}>
              Organize & Save
            </Heading>
            <Text color="gray.600" textAlign="center">
              Save and organize your links into categories for easy access
              anytime.
            </Text>
          </VStack>

          {/* Feature 3 */}
          <VStack
            p={8}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            align="center"
          >
            <Box
              bg="primary.500"
              color="white"
              p={4}
              borderRadius="full"
              mb={4}
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="40"
                height="40"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12l4-4m0 0l4 4m-4-4v10"
                />
              </svg>
            </Box>
            <Heading size="md" mb={2} fontFamily={"IBM Plex Sans"}>
              Access Anywhere
            </Heading>
            <Text color="gray.600" textAlign="center">
              Access your saved links from any device, whether you&apos;re at
              home or on the go.
            </Text>
          </VStack>
        </Flex>
      </Box>

      {/* CTA Section */}
      <Box id="cta" bg="primary.500" py={16} textAlign="center" color="white">
        <Heading mb={4} fontFamily={"IBM Plex Sans"}>
          Start Sharing Links Today!
        </Heading>
        <Text fontSize="lg" mb={8}>
          Create an account in seconds and start organizing your favorite
          content.
        </Text>
        <Button colorScheme="whiteAlpha" size="lg">
          <Link to={"/register"}>Sign up for free</Link>
        </Button>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="gray.800" py={8} textAlign="center" color="gray.400">
        <Text>
          &copy; {new Date().getFullYear()} Barfolio. All Rights Reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default LandingPage;
