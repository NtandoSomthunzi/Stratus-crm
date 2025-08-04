import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Switch,
  VStack,
  SlideFade,
  useColorModeValue,
} from "@chakra-ui/react";

const Settings = () => {
  const bg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <SlideFade in={true} offsetY="20px">
      <Box bg={bg} p={6} borderRadius="md" border="1px" borderColor={borderColor}>
        <Heading mb={4}>Settings</Heading>
        <Text mb={6}>Manage your CRM preferences below.</Text>

        <VStack spacing={4} align="stretch">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="notifications" mb="0">
              Enable Notifications
            </FormLabel>
            <Switch id="notifications" defaultChecked />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="autoUpdates" mb="0">
              Automatic Updates
            </FormLabel>
            <Switch id="autoUpdates" defaultChecked />
          </FormControl>
        </VStack>
      </Box>
    </SlideFade>
  );
};

export default Settings;
