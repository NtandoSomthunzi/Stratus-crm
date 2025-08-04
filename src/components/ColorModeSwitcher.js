import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      variant="ghost"
      color="current"
      ml="auto"
      onClick={toggleColorMode}
      icon={isDark ? <SunIcon /> : <MoonIcon />}
    />
  );
};

export default ColorModeSwitcher;
