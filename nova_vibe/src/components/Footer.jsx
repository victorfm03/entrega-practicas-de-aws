import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Link } from "react-router";

/**
 * Pie de página de la aplicación.
 * Ajusta colores y enlaces de navegación según el modo seleccionado.
 *
 * @returns {JSX.Element} Pie de página con enlaces y crédito.
 */
function Footer() {
  const { darkMode } = useContext(ThemeContext);

  const backgroundColor = darkMode ? "#0047AB" : "#00BFFF";
  const subBackground = darkMode ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.2)";

  return (
    <MDBFooter
      className="text-center text-lg-start text-light mt-4"
      style={{ backgroundColor }}
    >
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-4">
            <h5 className="text-uppercase">Nova_vibe</h5>
            <p>Explora la tienda Online de tus hijos</p>
          </MDBCol>
          <MDBCol lg="3" md="6" className="mb-4">
            <h5 className="text-uppercase">Enlaces</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/" className="link">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="añadirProducto" className="link">
                  Añadir productos
                </Link>
              </li>
              <li>
                <Link to="productList" className="link">
                  Listado de todos nuestros productos
                </Link>
              </li>
              <li>
                <Link to="añadirCategoria" className="link">
                  Añadir categoria
                </Link>
              </li>
              <li>
                <Link to="categoryList" className="link">
                  Listado de todas nuestras categorias
                </Link>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div
        className="text-center p-3"
        style={{ backgroundColor: subBackground }}
      >
        © {new Date().getFullYear()} Nova_vibe - Todos los derechos reservados
      </div>
    </MDBFooter>
  );
}

export default Footer;
