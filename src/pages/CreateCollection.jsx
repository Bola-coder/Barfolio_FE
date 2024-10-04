import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  HStack,
  IconButton,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCollectionContext } from "../contexts/CollectionContext";

const CreateCollection = () => {
  const { loading, createNewCollection } = useCollectionContext();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    linkCollection: Yup.array().of(
      Yup.object().shape({
        header: Yup.string().required("Section header is required"),
        contact: Yup.string().required("Contact is required"),
        image: Yup.string(),
        links: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().required("Link title is required"),
            url: Yup.string().url("Invalid URL").required("URL is required"),
          })
        ),
      })
    ),
  });

  const initialValues = {
    title: "",
    description: "",
    linkCollection: [
      {
        header: "",
        contact: "",
        image: "",
        links: [{ title: "", url: "" }],
      },
    ],
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      createNewCollection(values);
    },
  });

  // Handle image file selection
  const handleImageUpload = (e, sectionIndex) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue(`linkCollection[${sectionIndex}].image`, file);
    }
  };

  const addLink = (sectionIndex) => {
    formik.setFieldValue(
      `linkCollection[${sectionIndex}].links`,
      formik.values.linkCollection[sectionIndex].links.concat({
        title: "",
        url: "",
      })
    );
  };

  const removeLink = (sectionIndex, linkIndex) => {
    if (formik.values.linkCollection[sectionIndex].links.length > 1) {
      formik.setFieldValue(
        `linkCollection[${sectionIndex}].links`,
        formik.values.linkCollection[sectionIndex].links.filter(
          (_, i) => i !== linkIndex
        )
      );
    }
  };

  const addSection = () => {
    formik.setFieldValue(
      `linkCollection`,
      formik.values.linkCollection.concat({
        header: "",
        links: [{ title: "", url: "" }],
      })
    );
  };

  const removeSection = (sectionIndex) => {
    if (formik.values.linkCollection.length > 1) {
      formik.setFieldValue(
        `linkCollection`,
        formik.values.linkCollection.filter((_, i) => i !== sectionIndex)
      );
    }
  };

  return (
    <Box maxW="800px" mx="auto" p="4" fontFamily={"IBM Plex Sans"}>
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        mb="6"
        fontFamily={"IBM Plex Sans"}
      >
        Create Your Link Collection
      </Heading>

      <form onSubmit={formik.handleSubmit}>
        <FormControl mt={4}>
          <FormLabel>Collection Title</FormLabel>
          <Input
            variant={"filled"}
            type="text"
            focusBorderColor="primary.300"
            name="title"
            id="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <Text color="red">{formik.errors.title}</Text>
          )}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Collection Description</FormLabel>
          <Input
            variant={"filled"}
            type="text"
            focusBorderColor="primary.300"
            name="description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <Text color="red">{formik.errors.description}</Text>
          )}
        </FormControl>

        {/* Link Collection */}
        <VStack mt={4} align="start">
          {formik.values.linkCollection.map((section, sectionIndex) => (
            <Box key={sectionIndex} w="100%">
              <Flex
                justifyContent="space-between"
                alignItems={"flex-end"}
                gap={2}
              >
                <FormControl mt={4}>
                  <FormLabel>Section Header</FormLabel>
                  <Input
                    variant={"filled"}
                    type="text"
                    focusBorderColor="primary.300"
                    name={`linkCollection[${sectionIndex}].header`}
                    value={section.header}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.linkCollection &&
                    formik.touched.linkCollection[sectionIndex]?.header &&
                    formik.errors.linkCollection &&
                    formik.errors.linkCollection[sectionIndex]?.header && (
                      <Text color="red">
                        {formik.errors.linkCollection[sectionIndex].header}
                      </Text>
                    )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Contact</FormLabel>
                  <Input
                    variant={"filled"}
                    type="text"
                    focusBorderColor="primary.300"
                    name={`linkCollection[${sectionIndex}].contact`}
                    value={section.contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.linkCollection &&
                    formik.touched.linkCollection[sectionIndex]?.contact &&
                    formik.errors.linkCollection &&
                    formik.errors.linkCollection[sectionIndex]?.contact && (
                      <Text color="red">
                        {formik.errors.linkCollection[sectionIndex].contact}
                      </Text>
                    )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Image</FormLabel>
                  <Input
                    variant={"filled"}
                    type="file"
                    focusBorderColor="primary.300"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, sectionIndex)}
                    // onBlur={formik.handleBlur}
                  />
                  {formik.touched.linkCollection &&
                    formik.touched.linkCollection[sectionIndex]?.image &&
                    formik.errors.linkCollection &&
                    formik.errors.linkCollection[sectionIndex]?.image && (
                      <Text color="red">
                        {formik.errors.linkCollection[sectionIndex].image}
                      </Text>
                    )}
                </FormControl>

                {/* Delete Section button */}
                {formik.values.linkCollection.length > 1 && (
                  <Box>
                    <IconButton
                      aria-label="Delete Section"
                      icon={<DeleteIcon />}
                      onClick={() => removeSection(sectionIndex)}
                    />
                  </Box>
                )}
              </Flex>

              {/* Links */}
              <VStack mt={4} align="start">
                {section.links.map((link, linkIndex) => (
                  <HStack
                    key={linkIndex}
                    w="100%"
                    spacing={4}
                    alignItems={"flex-end"}
                  >
                    <FormControl>
                      <FormLabel>Link Title</FormLabel>
                      <Input
                        variant={"filled"}
                        type="text"
                        focusBorderColor="primary.300"
                        name={`linkCollection[${sectionIndex}].links[${linkIndex}].title`}
                        value={link.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.linkCollection &&
                        formik.touched.linkCollection[sectionIndex]?.links?.[
                          linkIndex
                        ]?.title &&
                        formik.errors.linkCollection &&
                        formik.errors.linkCollection[sectionIndex]?.links?.[
                          linkIndex
                        ]?.title && (
                          <Text color="red">
                            {
                              formik.errors.linkCollection[sectionIndex].links[
                                linkIndex
                              ].title
                            }
                          </Text>
                        )}
                    </FormControl>

                    <FormControl>
                      <FormLabel>Link URL</FormLabel>
                      <Input
                        variant={"filled"}
                        type="text"
                        focusBorderColor="primary.300"
                        name={`linkCollection[${sectionIndex}].links[${linkIndex}].url`}
                        value={link.url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.linkCollection &&
                        formik.touched.linkCollection[sectionIndex]?.links?.[
                          linkIndex
                        ]?.url &&
                        formik.errors.linkCollection &&
                        formik.errors.linkCollection[sectionIndex]?.links?.[
                          linkIndex
                        ]?.url && (
                          <Text color="red">
                            {
                              formik.errors.linkCollection[sectionIndex].links[
                                linkIndex
                              ].url
                            }
                          </Text>
                        )}
                    </FormControl>

                    {/* Delete Link button */}
                    {section.links.length > 1 && (
                      <IconButton
                        aria-label="Delete Link"
                        icon={<CloseIcon />}
                        onClick={() => removeLink(sectionIndex, linkIndex)}
                      />
                    )}
                  </HStack>
                ))}

                {/* Add Link Button */}
                <Button
                  leftIcon={<AddIcon />}
                  onClick={() => addLink(sectionIndex)}
                >
                  Add Link
                </Button>
              </VStack>
            </Box>
          ))}

          {/* Add Section Button */}
          <Button leftIcon={<AddIcon />} onClick={addSection}>
            Add Section
          </Button>
        </VStack>

        <Divider my={4} />
        <Button type="submit" colorScheme="primary" disabled={loading}>
          {loading ? <Spinner size="md" color="white" /> : "Create Collection"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateCollection;
