import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

/**
 * Contexto que expone el estado del modo oscuro y la función de actualización.
 * @type {React.Context<{darkMode:boolean, setDarkMode:function}>}
 */
export const ThemeContext = createContext();

/**
 * Componente proveedor de tema para toda la aplicación.
 * Gestiona el modo claro/oscuro y aplica la paleta de Material UI.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children Contenido hijo envuelto por el proveedor.
 * @returns {JSX.Element}
 */
export function ThemeProviderWrapper({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/**
         * Ajusta la clase de estilo global según el modo actual.
         * Esto añade fondo y color de texto apropiados para cada modo.
         */}
        <div className={darkMode ? "bg-dark text-white" : "bg-light text-dark"}>
          {children}
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
