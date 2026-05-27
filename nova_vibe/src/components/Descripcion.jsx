import { MDBContainer } from "mdb-react-ui-kit";

/**
 * Componente de descripción de la tienda.
 * Presenta el mensaje principal de bienvenida y valor diferencial.
 *
 * @returns {JSX.Element} Elemento de presentación de la tienda.
 */
function Descripcion() {
  return (
    <MDBContainer className="text-center my-4">
      <h2>Bienvenido a nuestra tienda de Productos Online</h2>
      <p>
        Compre nuestros productos a un precio de gran calidad y los obtendra antes de
        lo esperado.
      </p>
    </MDBContainer>
  );
}

export default Descripcion;