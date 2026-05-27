import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Tabla from "../components/Tabla";
import { useEffect, useState, useRef } from "react";
import { apiUrl } from "../config";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForEverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Página que muestra la lista de productos y permite buscarlos y eliminarlos.
 *
 * @returns {JSX.Element} Vista de listado de productos.
 */
function ProductList() {
  const [rows, setRows] = useState([]);
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const tableRef = useRef(null);

  /**
   * Genera un PDF con el contenido de la tabla y lo descarga.
   */
  const handleDownloadPdf = async () => {
    if (!tableRef.current) return;

    try {
      const canvas = await html2canvas(tableRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pageWidth / imageWidth, pageHeight / imageHeight);
      const imgWidth = imageWidth * ratio;
      const imgHeight = imageHeight * ratio;

      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("product-list.pdf");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("No se pudo descargar el PDF de la tabla.");
    }
  };

  const columns = [
    { field: "id_product", header: "ID", align: "right" },
    { field: "product_name", header: "Nombre" },
    { field: "price", header: "Precio", render: (row) => `${row.price} €` },
    {
      field: "category",
      header: "Categoría",
      render: (row) => row.idcategory_category?.category_name || "Sin categoría",
    },
    {
      field: "in_stock",
      header: "Stock",
      render: (row) => (row.in_stock ? "Sí" : "No"),
    },
    { field: "registration_date", header: "Fecha de registro" },
  ];

  const actions = [
    {
      icon: <EditNoteIcon fontSize="small" />,
      onClick: (row) => navigate("/modificarProducto/" + row.id_product),
    },
    {
      icon: <DeleteForEverIcon fontSize="small" />,
      color: "error",
      onClick: (row) => handleDelete(row.id_product),
    },
  ];

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(apiUrl + "/product");

      if (response.ok) {
        const data = await response.json();
        setRows(data.datos);
      }
    }

    getProduct();
  }, []);

  /**
   * Elimina un producto por su identificador.
   *
   * @param {number|string} id_product Identificador del producto.
   */
  const handleDelete = async (id_product) => {
    if (!confirm("Seguro que quieres borrar este producto")) {
      return;
    }

    const response = await fetch(apiUrl + "/product/" + id_product, {
      method: "DELETE",
    });

    if (response.ok) {
      const productosRestantes = rows.filter((producto) => producto.id_product != id_product);
      setRows(productosRestantes);
    }
  };

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  /**
   * Realiza la búsqueda parametrizada de productos por nombre.
   *
   * @param {React.FormEvent<HTMLFormElement>} e Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "/product";
      if (nombre !== "") {
        url += "/parametrizado/" + nombre;
      }

      const response = await fetch(apiUrl + url);

      if (response.ok) {
        const respuesta = await response.json();
        if (respuesta.ok) {
          setRows(respuesta.datos);
        }
      }
    } catch (error) {
      console.error("Error al buscar productos:", error);
      alert("Error al buscar productos.");
    }
  };

  return (
    <Box id="pdf-Content">
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Lista de productos
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "right" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mx: 2 }}>
            <TextField
              id="nombre"
              label="Nombre del producto"
              variant="outlined"
              name="nombre"
              value={nombre}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Buscar
            </Button>
            <Button variant="outlined" onClick={handleDownloadPdf}>
              Descargar tabla en PDF
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <div ref={tableRef}>
        <Tabla columns={columns} rows={rows.map((r) => ({ ...r, id: r.id_product }))} actions={actions} />
      </div>
    </Box>
  );
}

export default ProductList;
