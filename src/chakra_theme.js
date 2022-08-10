import { extendTheme } from "@chakra-ui/react";

const overrides = {
  colors: {
    brand: {
      100: "#b02e46",
      80: "##84CC16",
    },
  },
};
const theme = extendTheme(overrides);

export default theme;
