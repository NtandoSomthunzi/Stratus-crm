import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  SlideFade,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContacts } from "../contexts/ContactsContext";

const Contacts = () => {
  const { contacts, deleteContact } = useContacts();
  const bg = useColorModeValue("brand.50", "gray.700");
  const borderColor = useColorModeValue("gray.100", "gray.600");

  return (
    <SlideFade in={true} offsetY="20px">
      <Box>
        <Heading mb={4}>Contacts</Heading>
        <Box borderRadius="md" overflow="auto" boxShadow="lg" bg={bg} border="1px" borderColor={borderColor}>
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contacts.length ? (
                contacts.map(({ id, name, email, phone }) => (
                  <Tr key={id}>
                    <Td>{name}</Td>
                    <Td>{email}</Td>
                    <Td>{phone}</Td>
                    <Td>
                      <Button size="sm" colorScheme="red" onClick={() => deleteContact(id)}>
                        Delete
                      </Button>
                      {/* We can add an Edit button later */}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4} textAlign="center">
                    No contacts found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </SlideFade>
  );
};

export default Contacts;
