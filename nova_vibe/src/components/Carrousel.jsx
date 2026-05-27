import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import buzzLight_year from "../assets/buzzLight year.jpg";
import meta_gear from "../assets/meta_gear.png";
import puma from "../assets/puma.jpg";
import woody from "../assets/woody.jpg";

/**
 * Componente de carrusel de productos.
 * Muestra una secuencia de imágenes con transición automática cada 4 segundos.
 *
 * @returns {JSX.Element} Componente visual del carrusel.
 */
function Carrousel() {
  return (
    <MDBCarousel showIndicators fade interval={4000} pause="false">
      <MDBCarouselItem itemId={1}>
        <img src={buzzLight_year} className="d-block w-100" alt="buzzLight year" />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src={woody} className="d-block w-100" alt="woody" />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src={meta_gear} className="d-block w-100" alt="meta_gear" />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={4}>
        <img src={puma} className="d-block w-100" alt="puma" />
      </MDBCarouselItem>
    </MDBCarousel>
  );
}

export default Carrousel;