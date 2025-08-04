import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  useColorMode,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";
import Dashboard from "./pages/Dashboard";
import LeadDetail from "./pages/LeadDetail";
import Documents from "./pages/Documents";
import MeetingsPage from "./pages/MeetingsPage";
import AddLead from "./pages/AddLead";
import Settings from "./pages/Settings";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("#e2e8f0", "gray.700");

  return (
    <Flex
      p={4}
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      align="center"
      justify="space-between"
      wrap="wrap"
      shadow="md"
    >
      <Flex gap={2} wrap="wrap">
        <Button as={Link} to="/" colorScheme="brand" variant="solid">
          Home
        </Button>
        <Button as={Link} to="/contacts" colorScheme="brand" variant="ghost">
          Contacts
        </Button>
        <Button as={Link} to="/add-contact" colorScheme="brand" variant="ghost">
          Add Contact
        </Button>
        <Button as={Link} to="/dashboard" colorScheme="brand" variant="ghost">
          Dashboard
        </Button>
        <Button as={Link} to="/add-lead" colorScheme="brand" variant="ghost">
          Add Lead
        </Button>
        <Button as={Link} to="/settings" colorScheme="brand" variant="ghost">
          Settings
        </Button>
      </Flex>

      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Flex>
  );
};

const App = () => {
  return (
    <Router>
      <NavBar />
      <Box
        bgGradient={{
          light: "linear(to-r, brand.50, white)",
          dark: "linear(to-r, gray.800, gray.900)",
        }[useColorMode().colorMode]}
        minH="100vh"
        p={6}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/lead/:id" element={<LeadDetail />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/meetings/:id" element={<MeetingsPage />} />
          <Route path="/documents/:id" element={<Documents />} />
          <Route path="/lead-detail/:id" element={<LeadDetail />} />
          <Route path="/meetings/:id" element={<MeetingsPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
