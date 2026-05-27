import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Tabla from "../components/Tabla";
import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../config";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForEverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Página de listado de categorías.
 * Muestra las categorías existentes y permite búsqueda y eliminación.
 *
 * @returns {JSX.Element} Vista de listado de categorías.
 */
function CategoryList() {
  const [rows, setRows] = useState([]);
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const tableRef = useRef(null);

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
        pdf.save("category-list.pdf");
      } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("No se pudo descargar el PDF de la tabla.");
      }
    };

  const columns = [
    { field: "id_category", header: "ID", align: "right" },
    { field: "category_name", header: "Nombre" },
    { field: "description", header: "descripcion" },
    {
      field: "like_count",
      header: "Popularidad",
      render: (row) => `${row.like_count}`,
    },
    {
      field: "seasonal_product_available",
      header: "PDT",
      render: (row) => (row.seasonal_product_available ? "Sí" : "No"),
    },
    { field: "creation_date", header: "Fecha de creacion" },
  ];

  const actions = [
    {
      icon: <EditNoteIcon fontSize="small" />,
      onClick: (row) => navigate("/modificarCategoria/" + row.id_category),
    },
    {
      icon: <DeleteForEverIcon fontSize="small" />,
      color: "error",
      onClick: (row) => handleDelete(row.id_category),
    },
  ];

  useEffect(() => {
    async function getcategory() {
      const response = await fetch(apiUrl + "/category");

      if (response.ok) {
        const data = await response.json();
        setRows(data.datos);
      }
    }

    getcategory();
  }, []);

  /**
   * Elimina una categoría seleccionada y actualiza la tabla local.
   *
   * @param {number|string} id_category Identificador de la categoría.
   */
  const handleDelete = async (id_category) => {
    if (!confirm("Seguro que quieres borrar este categoria")) {
      return;
    }

    const response = await fetch(apiUrl + "/category/" + id_category, {
      method: "DELETE",
    });

    if (response.ok) {
      const categoriasRestantes = rows.filter((category) => category.id_category != id_category);
      setRows(categoriasRestantes);
    }
  };

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  /**
   * Busca categorías por nombre usando el endpoint parametrizado.
   *
   * @param {React.FormEvent<HTMLFormElement>} e Evento de envío de formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "/category";
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
      console.error("Error al buscar categorías:", error);
      alert("Error al buscar categorías.");
    }
  };

  return (
    <Box id="pdf-Content">
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Lista de categorias
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center", alignItems: "right" }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mx: 2 }}>
            <TextField
              id="nombre"
              label="Nombre de categoria"
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
        <Tabla columns={columns} rows={rows.map((r) => ({ ...r, id: r.id_category }))} actions={actions} />
      </div>
    </Box>
  );
}

export default CategoryList;
