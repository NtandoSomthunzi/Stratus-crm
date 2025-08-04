import { useState } from "react";
import {
  Heading,
  VStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Fade,
} from "@chakra-ui/react";
import { useContacts } from "../contexts/ContactsContext";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const toast = useToast();
  const { addContact } = useContacts();

  const handleAddContact = () => {
    if (!name || !email || !phone) {
      toast({
        title: "Missing information.",
        description: "Please fill in name, email, and phone number.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    addContact({ name, email, phone });

    toast({
      title: "Contact added.",
      description: `Name: ${name}, Email: ${email}, Phone: ${phone}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <Fade in={true}>
      <Box>
        <Heading>Add New Contact</Heading>
        <VStack spacing={4} mt={4} align="stretch">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleAddContact}>
            Add Contact
          </Button>
        </VStack>
      </Box>
    </Fade>
  );
};

export default AddContact;
