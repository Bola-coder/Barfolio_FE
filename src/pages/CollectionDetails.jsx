import { useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Badge,
  Button,
  Flex,
  Spinner,
  Image as MyImage,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { FaDownload, FaShare } from "react-icons/fa";
import { useCollectionContext } from "../contexts/CollectionContext";
import curveCardBg from "./../assets/curveCardBg.png";
import ShareButtonsModal from "../components/ShareButtonsModal";

const CollectionDetails = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, collectionDetails, fetchCollectionDetails } =
    useCollectionContext();
  const { id } = useParams();
  const qrRef = useRef();

  const getBaseUrl = () => {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ""}/`;
  };

  const baseUrl = getBaseUrl();

  useEffect(() => {
    fetchCollectionDetails(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = svg.clientWidth;
    canvas.height = svg.clientHeight;

    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${collectionDetails?.title}-QRCode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = url;
  };

  if (loading || !collectionDetails) {
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

  return (
    <Box mx="auto" p={{ base: "4", md: "6" }} fontFamily="IBM Plex Sans">
      {/* Header Section */}
      <VStack
        spacing={{ base: "2", md: "4" }}
        align="center"
        textAlign="center"
      >
        <Heading
          as="h1"
          size={{ base: "xl", md: "2xl" }}
          fontFamily="IBM Plex Sans"
        >
          {collectionDetails.title}
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
          {collectionDetails.description}
        </Text>
        <HStack>
          <Badge colorScheme="blue" fontSize={{ base: "0.8em", md: "0.9em" }}>
            {collectionDetails.linkCollection.length} Sections
          </Badge>
          <Badge colorScheme="green" fontSize={{ base: "0.8em", md: "0.9em" }}>
            {collectionDetails.linkCollection.reduce(
              (totalLinks, section) => totalLinks + section.links.length,
              0
            )}{" "}
            Links
          </Badge>
        </HStack>

        {/* QR Code and Download Button */}
        <Box ref={qrRef} p={{ base: 4, md: 6 }}>
          <QRCode
            value={`${baseUrl}collection/public/${collectionDetails?._id}`}
            size={200}
          />
        </Box>
        <Flex justifyContent="center" gap={{ base: 2, md: 4 }}>
          <Button colorScheme="primary" onClick={onOpen}>
            <FaShare size={18} style={{ marginRight: "10px" }} />
            Share
          </Button>

          <Button colorScheme="primary" onClick={downloadQRCode}>
            <FaDownload size={18} style={{ marginRight: "10px" }} />
            Download
          </Button>
        </Flex>
      </VStack>

      <Divider my={{ base: 4, md: 6 }} />

      {/* Section Links as Cards */}
      <Flex
        gap={{ base: 4, md: 8 }}
        justifyContent="center"
        flexWrap="wrap"
        mt={{ base: 6, md: 8 }}
      >
        {collectionDetails.linkCollection.map((section, sectionIndex) => (
          <Card
            key={sectionIndex}
            variant="outline"
            boxShadow="lg"
            backgroundColor="primary.300"
            _hover={{ boxShadow: "xl" }}
            position="relative"
            overflow="hidden"
            w={"350px"}
          >
            <Box>
              <MyImage
                src={curveCardBg}
                alt="Background Image"
                width="100%"
                height="150px"
                objectFit="cover"
                borderTopRadius="md"
              />

              <Box
                p="6"
                zIndex="2"
                width="130px"
                height="130px"
                mx="auto"
                position="absolute"
                top="17%"
                left="32%"
                padding={2}
                borderRadius="50%"
                backgroundColor="primary.300"
              >
                <Box
                  width="100%"
                  height="100%"
                  padding="5px"
                  borderRadius="50%"
                  backgroundColor="#FFF"
                >
                  <MyImage
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

            <CardHeader color="primary.500" zIndex="1" mt="36px">
              <Heading
                size={{ base: "sm", md: "md" }}
                fontFamily="IBM Plex Sans"
                textAlign="center"
              >
                {section.header}
              </Heading>
              {section?.contact && (
                <Text textAlign="center" mt={{ base: "2%", md: "4%" }}>
                  {section?.contact}
                </Text>
              )}
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
                    color="primary.500"
                    variant="solid"
                  >
                    {link.title}
                  </Button>
                ))}
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Flex>

      <Divider my={{ base: 4, md: 6 }} />

      {/* Footer Actions */}
      <HStack justify="center" spacing={{ base: 2, md: 4 }}>
        <Button
          colorScheme="primary"
          onClick={() => navigate(`/collection/${collectionDetails._id}/edit`)}
        >
          Edit Collection
        </Button>
        <Button colorScheme="red" variant="outline">
          Delete Collection
        </Button>
      </HStack>

      <ShareButtonsModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default CollectionDetails;
