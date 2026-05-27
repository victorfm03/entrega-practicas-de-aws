import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { apiUrl } from "../config";

/**
 * Página que muestra el número de categorías asignadas a cada producto
 * y permite exportarlo a PDF.
 *
 * @returns {JSX.Element}
 */
export default function CategoriesByProduct() {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl + "/product");
        if (!response.ok) return;

        const result = await response.json();
        const products = result.datos || [];

        const chartData = products.map((product) => ({
          name: product.product_name || `Producto ${product.id_product}`,
          categories: product.idcategory_category ? 1 : 0,
          category: product.idcategory_category?.category_name || "Sin categoría",
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    }

    fetchData();
  }, []);

  const handleExportPdf = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;

      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("categorias-por-producto.pdf");
    } catch (error) {
      console.error("Error exportando PDF:", error);
      alert("No se pudo exportar el PDF del gráfico.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Categorías por producto
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button variant="contained" onClick={handleExportPdf}>
          Exportar gráfico a PDF
        </Button>
      </Box>

      <div ref={chartRef} style={{ width: "100%", height: 450, background: "#fff", padding: 12 }}>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" height={100} />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value) => [value, "Categorías"]} />
            <Legend />
            <Bar dataKey="categories" name="Categorías por producto" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
}
