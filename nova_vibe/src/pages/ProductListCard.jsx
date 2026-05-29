/**
 * @fileoverview Componente que muestra los productos en tarjetas personalizadas
 *
 * Alternativa visual al listado en tabla. Muestra los productos como tarjetas con
 * imagen, nombre, biografía y fecha de nacimiento. Permite editar y eliminar los productos.
 *
 * @module components/ProductListCard
 * @requires react
 * @requires @mui/material
 * @requires ../api
 */

import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { data, Link } from "react-router";
import { apiUrl } from "../config";
import styles from "../css/Impresion.module.css";

/**
 * Componente que muestra el listado de los productos como tarjetas
 *
 * Características:
 * - Obtiene los productos del servidor al montar el componente
 * - Muestra cada producto como una tarjeta con imagen
 * - Tarjeta contiene: nombre, biografía, fecha de nacimiento
 * - Acciones: editar y borrar producto
 * - Botón flotante para imprimir la página
 * - Diseño responsivo (xs: 12, sm: 6, md: 4, lg: 3 columnas)
 *
 * @component
 * @returns {JSX.Element} Grid de tarjetas de productos o mensajes de estado
 */

function ProductListCard() {
  const [datos, setDatos] = useState([]);

  // Estado para manejar errores
  const [error, setError] = useState(null);

  /**
   * Efecto para cargar los productos al montar el componente
   */
  useEffect(() => {
    async function fetchProductos() {
      try {
        // Obtener productos del backend
        const response = await fetch(apiUrl + "/product");

        if (response.ok) {
            
            const data = await response.json();
          // Actualizar estado con los datos obtenidos
          setDatos(data.datos);
          setError(null);
        }
      } catch (error) {
        // En caso de error, mostrar mensaje
        setError(error.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchProductos();
  },[]);

    /**
   * Elimina un producto por su identificador.
   *
   * @param {number|string} id_product Identificador del producto.
   */

    async function handleDelete(id_product) {
    try {
      // Enviar solicitud de eliminación al servidor
      await apiUrl.delete("/product/" + id_product);

      // Filtrar el producto eliminado del estado local
      const datos_nuevos = datos.filter(
        (product) => product.id_product != id_product,
      );

      // Actualizar el estado sin el producto eliminado
      setDatos(datos_nuevos);
      setError(null);
    } catch (error) {
      // Mostrar error si algo falla
      setError(error.mensaje || "No se pudo conectar al servidor");
      setDatos([]);
    }
  }

    // Mostrar mensaje si hay error
  if (error != null) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </>
    );
  }

  // Mostrar mensaje si no hay productos
  if (!datos || datos.length === 0) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No hay productos disponibles
        </Typography>
      </>
    );
  }


  return (
    <>
      {/* Título */}
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Listado de productos
      </Typography>
      
      {/* Grid responsivo con tarjetas */}
      <Grid container spacing={1}>
        {datos.map((row) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={row.id_product}>
            {/* Tarjeta de producto */}
            <Card>
              
              {/* Contenido de la tarjeta */}
              <CardContent>
                {/* Nombre del producto */}
                <Typography gutterBottom variant="h5" component="div">
                  {row.product_name}
                </Typography>
                
                {/* Biografía del producto */}
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {row.biography}
                </Typography>
                
                {/* Categoría del producto */}
                <Typography variant="caption" gutterBottom>
                  {row.idcategory_category?.category_name||"Sin categoría"}
                </Typography>
              </CardContent>
              
              {/* Botones de acciones */}
              <CardActions>
                {/* Botón para editar */}
                <Link to={`/productModify/${row.id_product}`}>
                  <Button size="small">EDITAR</Button>
                </Link>
                
                {/* Botón para eliminar */}
                <Button
                  size="small"
                  onClick={() => handleDelete(row.id_product)}
                >
                  BORRAR
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Botón flotante para imprimir */}
      <Fab
        className={styles.noprint}
        color="secondary"
        aria-label="imprimir"
        onClick={() => window.print()}
        sx={{
          position: "fixed",
          top: 85,
          right: 20,
        }}
      >
        <PrintIcon />
      </Fab>
    </>
  );
}

export default ProductListCard;
