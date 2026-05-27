// theme.js o similar
import { createTheme } from "@mui/material/styles";

/**
 * Crea el tema de Material UI en función del modo seleccionado.
 *
 * @param {'light'|'dark'} mode Modo de color para el tema.
 * @returns {Theme} Tema de Material UI.
 */
export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#1976d2" },
          }
        : {
            primary: { main: "#90caf9" },
          }),
    },
  });

