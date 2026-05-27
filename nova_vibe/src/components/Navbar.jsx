/**
 * Barra de navegación global de la aplicación.
 * Usa el contexto de tema para alternar entre modo claro y modo oscuro.
 *
 * @returns {JSX.Element}
 */
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

import { Link } from "react-router";

function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <MDBNavbar
      expand="lg"
      light={!darkMode}
      dark={darkMode}
      className={darkMode ? "navbar-dark-custom" : "navbar-light-custom"}
    >
      <MDBContainer fluid>
        <MDBNavbarBrand href="/" className="marco">
          nova_vibe
        </MDBNavbarBrand>

        <MDBNavbarNav className="ms-auto">
          {/**
           * Menú de productos con enlaces a componentes de alta y listado.
           */}
          <MDBNavbarItem>
            <MDBDropdown>
              <MDBDropdownToggle tag="a" className="marco2">
                Productos
              </MDBDropdownToggle>

              <MDBDropdownMenu>
                <MDBDropdownItem tag={Link} to="/añadirProducto" link>
                  Añadir un producto nuevo
                </MDBDropdownItem>
                <MDBDropdownItem tag={Link} to="/productList" link>
                  ver/modificar todos los productos
                </MDBDropdownItem>
                <MDBDropdownItem tag={Link} to="/productosPorCategoria" link>
                  Productos por categoría (gráfico)
                </MDBDropdownItem>
                
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>

          {/**
           * Menú de categorías con enlaces de alta y listado.
           */}
          <MDBNavbarItem className="mx-2">
            <MDBDropdown>
              <MDBDropdownToggle tag="a" className="marco2">
                Categorias
              </MDBDropdownToggle>

              <MDBDropdownMenu>
                <MDBDropdownItem tag={Link} to="/añadirCategoria" link>
                  Añadir una nueva categoria
                </MDBDropdownItem>
                <MDBDropdownItem tag={Link} to="/categoryList" link>
                  ver/modificar todas las categorias
                </MDBDropdownItem>

                <MDBDropdownItem tag={Link} to="/categoriasPorProducto" link>
                  Categorías por producto (gráfico)
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>
        </MDBNavbarNav>

        {/**
         * Botón para alternar entre modo claro y oscuro.
         */}
        <div className="ms-auto d-flex">
          <MDBBtn
            color={darkMode ? "navbar-dark-custom" : "navbar-light-custom"}
            onClick={() => setDarkMode(!darkMode)}
            className={darkMode ? "icon-dark-custom" : "icon-light-custom"}
          >
            <MDBIcon
              fas
              icon={darkMode ? "sun" : "moon"}
              className={darkMode ? "icon-sun" : "icon-moon"}
            />
          </MDBBtn>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;