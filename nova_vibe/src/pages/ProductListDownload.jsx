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

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForEverIcon from "@mui/icons-material/DeleteForever";
import Tabla from "../components/Tabla";
import ProductListDownloadPdf from "./ProductListDownloadPdf";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { pdf } from "@react-pdf/renderer";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { apiUrl } from "../config";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

/**
 * Página que muestra la lista de productos y permite buscarlos y eliminarlos.
 *
 * @returns {JSX.Element} Vista de listado de productos.
 */
function ProductListDownload() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [filtroFechaRegistro, setFiltroFechaRegistro] = useState("");
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [nombre, setNombre] = useState("");

  const columns = [
    { field: "id_product", header: "ID", align: "right" },
    { field: "product_name", header: "Nombre" },
    { field: "price", header: "Precio", render: (row) => `${row.price} €` },
    {
      field: "category",
      header: "Categoría",
      render: (row) =>
        row.idcategory_category?.category_name || "Sin categoría",
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

  // Cargar productoes
  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener productos del backend
        const response = await fetch(apiUrl + "/product");

        if (response.ok) {
          const data = await response.json();
          // Actualizar estado con los datos obtenidos
          setRows(data.datos);
          setError(null);
        }
      } catch (error) {
        // En caso de error, mostrar mensaje
        setError(error.mensaje || "No se pudo conectar al servidor");
        setRows([]);
      }
    }

    fetchData();
  }, []);

  // Calcular datos filtrados con useMemo
  const datosFiltrados = useMemo(() => {
    let resultados = rows;

    if (filtroFechaRegistro) {
      const fechaSeleccionada = filtroFechaRegistro.slice(0, 10);
      resultados = resultados.filter((product) => {
        if (!product.registration_date) {
          return false;
        }
        return product.registration_date.slice(0, 10) === fechaSeleccionada;
      });
    }

    return resultados;
  }, [rows, filtroFechaRegistro]);

  const handleChange = (e) => {
    setFiltroFechaRegistro(e.target.value);
  };

  const handleDelete = async (id_product) => {
    if (!confirm("Seguro que quieres borrar este producto")) {
      return;
    }

    const response = await fetch(apiUrl + "/product/" + id_product, {
      method: "DELETE",
    });

    if (response.ok) {
      const productosRestantes = rows.filter(
        (producto) => producto.id_product != id_product,
      );
      setRows(productosRestantes);
    }
  };

  function limpiarFiltros() {
    setFiltroFechaRegistro("");
  }

  const handleDownloadPdf = async () => {
    try {
      const doc = <ProductListDownloadPdf data={datosFiltrados} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "productos.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<!DOCTYPE html><html><head><title>Productos PDF</title><style>html,body{margin:0;height:100%;overflow:hidden}iframe{border:none;width:100%;height:100%;}</style></head><body><iframe src="${url}"></iframe></body></html>`);
        newWindow.document.close();
      } else {
        throw new Error('No se pudo abrir la nueva pestaña');
      }

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 10000);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF');
    }
  };

  if (error != null) {
    return (
      <>
        <Typography variant="h4" align="center" sx={{ my: 3 }}>
          Listado de productos
        </Typography>
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Listado de productos con filtros
      </Typography>

      {/* Tarjeta de filtros */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filtros
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <TextField
                label="Fecha de registro"
                type="date"
                value={filtroFechaRegistro}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={limpiarFiltros}
                  fullWidth
                  startIcon={<ClearIcon />}
                  sx={{ height: "100%" }}
                >
                  Limpiar filtros
                </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Mensaje si no hay productos */}
      {(!datosFiltrados || datosFiltrados.length === 0) && (
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          No hay productos disponibles
        </Typography>
      )}

      <div ref={tableRef}>
        <Tabla
          columns={columns}
          rows={datosFiltrados.map((r) => ({ ...r, id: r.id_product }))}
          actions={actions}
        />
      </div>

      {datosFiltrados && datosFiltrados.length > 0 && (
        <Fab
          aria-label="descargar"
          onClick={handleDownloadPdf}
          sx={{
            position: "fixed",
            top: 85,
            right: 20,
          }}
        >
          <DownloadIcon />
        </Fab>
      )}
    </>
  );
}

export default ProductListDownload;
