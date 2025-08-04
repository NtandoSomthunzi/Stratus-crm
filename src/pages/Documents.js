import {
  Box,
  Heading,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { DownloadIcon, DeleteIcon } from "@chakra-ui/icons";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleUpload = () => {
    if (!title || !file) {
      toast({
        title: "Please provide both title and file.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newDoc = {
      id: Date.now(),
      title,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    };

    setDocuments((prev) => [...prev, newDoc]);
    setTitle("");
    setFile(null);
    toast({
      title: "Document uploaded successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast({
      title: "Document deleted.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Documents</Heading>
      <VStack spacing={4} align="stretch" mb={6}>
        <Input
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button colorScheme="blue" onClick={handleUpload}>
          Upload Document
        </Button>
      </VStack>

      <Heading size="md" mb={2}>
        Uploaded Documents
      </Heading>
      <VStack spacing={3} align="stretch">
        {documents.length ? (
          documents.map((doc) => (
            <Box
              key={doc.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              shadow="sm"
            >
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="bold">{doc.title}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {doc.fileName} • {new Date(doc.uploadedAt).toLocaleString()}
                  </Text>
                </Box>
                <HStack>
                  <IconButton
                    icon={<DownloadIcon />}
                    as="a"
                    href={doc.fileUrl}
                    download={doc.fileName}
                    colorScheme="green"
                    aria-label="Download"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(doc.id)}
                    colorScheme="red"
                    aria-label="Delete"
                  />
                </HStack>
              </HStack>
            </Box>
          ))
        ) : (
          <Text>No documents uploaded yet.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Documents;
