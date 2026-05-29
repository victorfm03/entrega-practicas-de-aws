/**
 * @fileoverview Componente PDF para exportar listado de productos filtrados
 */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "16.67%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "16.67%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    marginTop: 2,
    fontSize: 7,
  },
});

function ProductListDownloadPdf({ data }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.title}>
          <Text>Listado de Productos</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>ID</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Nombre</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Fecha</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Precio</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Categoría</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Stock</Text>
            </View>
          </View>

          {data.map((product, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.id_product}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.product_name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.registration_date}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.price} €</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {product.idcategory_category?.category_name || "Sin categoría"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {product.in_stock ? "Sí" : "No"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ProductListDownloadPdf;


