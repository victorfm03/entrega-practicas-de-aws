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
 * Página que muestra un gráfico de barras con el número de productos por categoría
 * y permite exportarlo a PDF.
 *
 * @returns {JSX.Element}
 */
export default function ProductsByCategory() {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(apiUrl + "/product");
        if (!res.ok) return;
        const json = await res.json();
        const products = json.datos || [];

        // Conteo por categoría
        const counts = products.reduce((acc, p) => {
          const cat = p.idcategory_category?.category_name || "Sin categoría";
          acc[cat] = (acc[cat] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(counts).map((key) => ({
          category: key,
          products: counts[key],
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
      const canvas = await html2canvas(chartRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("productos-por-categoria.pdf");
    } catch (error) {
      console.error("Error exportando PDF:", error);
      alert("No se pudo exportar el PDF del gráfico.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Productos por categoría
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button variant="contained" onClick={handleExportPdf}>
          Exportar gráfico a PDF
        </Button>
      </Box>

      <div ref={chartRef} style={{ width: "100%", height: 400, background: "#fff", padding: 12 }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="products" name="Productos" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
}
