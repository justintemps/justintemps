import { size } from ".";
import { colors } from "./colors";

const { bright_yellow, white, soft_yellow, cobalt, black } = colors;

export const theme = {
  colors: {
    background: cobalt,
    background_accent: black,
    primary: bright_yellow,
    secondary: soft_yellow,
    accent: white,
    text: white,
  },
  size: size,
};
