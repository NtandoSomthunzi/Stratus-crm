import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const Sidebar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("md", "dark-lg");

  return (
    <Box
      w={{ base: "full", md: 60 }}
      bg={bg}
      p={5}
      borderRadius="lg"
      shadow={shadow}
      position="sticky"
      top="4"
    >
      <Heading size="md" mb={6} color="brand.500" fontWeight="700">
        Stratus CRM
      </Heading>
      <VStack spacing={3} align="stretch">
        <Button as={RouterLink} to="/" variant="ghost" colorScheme="brand">
          Home
        </Button>
        <Button as={RouterLink} to="/contacts" variant="ghost" colorScheme="brand">
          Contacts
        </Button>
        <Button as={RouterLink} to="/dashboard" variant="ghost" colorScheme="brand">
          Dashboard
        </Button>
        <Button as={RouterLink} to="/add-lead" variant="ghost" colorScheme="brand">
          Add Lead
        </Button>
        <Button as={RouterLink} to="/add-contact" variant="ghost" colorScheme="brand">
          Add Contact
        </Button>
        <Button as={RouterLink} to="/settings" variant="ghost" colorScheme="brand">
          Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
