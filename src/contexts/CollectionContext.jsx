/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
import axiosInstance from "../config/axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CollectionContext = createContext();

export const useCollectionContext = () => {
  return useContext(CollectionContext);
};

const CollectionProvider = ({ children }) => {
  // const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const toast = useToast({
    position: "top right",
    variant: "subtle",
    duration: 3000,
    isClosable: true,
  });

  //   States
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState(null);
  const [publicCollectionDetails, setPublicCollectionDetails] = useState(null);

  useEffect(() => {}, []);

  const createNewCollection = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    data.linkCollection.forEach((collection, index) => {
      formData.append(`linkCollection[${index}][header]`, collection.header);
      formData.append(`linkCollection[${index}][contact]`, collection.contact);
      formData.append(`linkCollection[${index}][image]`, collection.image);
      collection.links.forEach((link, linkIndex) => {
        formData.append(
          `linkCollection[${index}][links][${linkIndex}][title]`,
          link.title
        );
        formData.append(
          `linkCollection[${index}][links][${linkIndex}][url]`,
          link.url
        );
      });
    });
    console.log(data);
    console.log("zform data", formData);
    setLoading(true);
    axiosInstance
      .post(`/collection`, formData, {
        withCredentials: true,
        headers: {
          //   "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        toast({
          title: "Collection created successfully",
          status: "success",
        });
        navigate("/collections");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const fetchCollections = async () => {
    setLoading(true);
    axiosInstance
      .get(`/collection`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setCollections(response.data.data.collections);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const fetchCollectionDetails = async (id) => {
    setCollectionDetails(null);
    setLoading(true);
    axiosInstance
      .get(`/collection/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response);
        setCollectionDetails(response.data.data.collection);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const updateCollection = async (id, data) => {
    console.log(data);
    setLoading(true);
    axiosInstance
      .patch(`/collection/${id}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        toast({
          title: "Collection updated successfully",
          status: "success",
        });
        navigate(`/collection/${id}`);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const fetchPublicCollectionDetails = async (id) => {
    setPublicCollectionDetails(null);
    setLoading(true);
    axiosInstance
      .get(`/collection/public/${id}`)
      .then((response) => {
        console.log(response);
        setPublicCollectionDetails(response.data.data.collection);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const values = {
    loading,
    collections,
    collectionDetails,
    publicCollectionDetails,
    createNewCollection,
    fetchCollections,
    fetchCollectionDetails,
    updateCollection,
    fetchPublicCollectionDetails,
  };

  return (
    <CollectionContext.Provider value={values}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
