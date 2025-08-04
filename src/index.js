import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { ContactsProvider } from "./contexts/ContactsContext";
import { MeetingsProvider } from "./contexts/MeetingsContext";
import { LeadsProvider } from "./contexts/LeadsContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ContactsProvider>
      <LeadsProvider>
        <MeetingsProvider>
          <React.StrictMode>
          <App />
          </React.StrictMode>
        </MeetingsProvider>
      </LeadsProvider>
    </ContactsProvider>
  </ChakraProvider>
);
