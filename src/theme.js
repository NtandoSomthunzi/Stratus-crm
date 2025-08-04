import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e3f9f6",
      100: "#c5e9e1",
      200: "#a5dad0",
      300: "#83cbc0",
      400: "#5fbdb0",
      500: "#46a396",
      600: "#357f75",
      700: "#245b54",
      800: "#133833",
      900: "#001512",
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
        transition: "background-color 0.2s ease, color 0.2s ease",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "xl",
      },
    },
  },
});

export default theme;
