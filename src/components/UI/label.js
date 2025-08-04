import { Box } from "@chakra-ui/react";

export const Label = ({ children, ...props }) => (
  <Box shadow="md" p={4} borderRadius="md" borderWidth="1px" {...props}>
    {children}
  </Box>
);
