/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

const ShareButtonsModal = ({ isOpen, onClose }) => {
  const shareUrl = "https://example.com"; // Replace with your app URL
  const title = "Check out this amazing content!";

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily={"IBM Plex Sans"}>
            Share this post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={"20px"}>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>

              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>

              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShareButtonsModal;
