import {
  Box,
  Heading,
  Text,
  SlideFade,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

const Home = () => {
  const bg = useColorModeValue("brand.50", "gray.700");
  const borderColor = useColorModeValue("gray.100", "gray.600");

  return (
    <SlideFade in={true} offsetY="20px">
      <Box>
        <Heading>Welcome to Stratus Apex CRM</Heading>
        <Text mt={2} mb={6}>
          Empowering you to manage clients and grow your business intelligently.
        </Text>

        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          <Stat
            p={4}
            border="1px"
            borderColor={borderColor}
            borderRadius="lg"
            bg={bg}
            boxShadow="lg"
          >
            <StatLabel>Active Contacts</StatLabel>
            <StatNumber>125</StatNumber>
          </Stat>
          <Stat
            p={4}
            border="1px"
            borderColor={borderColor}
            borderRadius="lg"
            bg={bg}
            boxShadow="lg"
          >
            <StatLabel>Open Deals</StatLabel>
            <StatNumber>42</StatNumber>
          </Stat>
          <Stat
            p={4}
            border="1px"
            borderColor={borderColor}
            borderRadius="lg"
            bg={bg}
            boxShadow="lg"
          >
            <StatLabel>Conversion Rate</StatLabel>
            <StatNumber>67%</StatNumber>
          </Stat>
        </SimpleGrid>
      </Box>
    </SlideFade>
  );
};

export default Home;
