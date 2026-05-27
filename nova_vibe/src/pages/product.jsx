import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Stack,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

/**
 * Formulario para crear un nuevo producto en el backend.
 *
 * @returns {JSX.Element} Formulario de alta de producto.
 */
function Product() {
  const [datos, setDatos] = useState({
    product_name: "",
    price: "",
    id_category: "",
    in_stock: true,
  });

  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(apiUrl + "/category");
        const data = await response.json();
        setCategorias(data.datos);
      } catch (error) {
        console.error("Error cargando categorías", error);
      }
    };

    fetchCategorias();
  }, []);

  /**
   * Envía los datos del formulario al endpoint de creación de productos.
   *
   * @param {React.FormEvent<HTMLFormElement>} e Evento de envío de formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + "/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        const respuesta = await response.json();
        alert(respuesta.mensaje);

        if (respuesta.ok) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error al enviar producto:", error);
      alert("Error al crear el producto.");
    }
  };

  /**
   * Actualiza los datos del formulario para campos de texto y select.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e Evento de cambio.
   */
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Actualiza el estado del checkbox que indica si el producto está en stock.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e Evento de checkbox.
   */
  const handleChangeChecked = (e) => {
    const value = e.target.checked;

    setChecked(value);
    setDatos({
      ...datos,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta de productos
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mx: 2 }}>
            <TextField
              id="nombre"
              label="Nombre de producto"
              variant="outlined"
              name="product_name"
              value={datos.product_name}
              onChange={handleChange}
              required
            />

            <TextField
              type="number"
              id="price"
              label="precio"
              variant="outlined"
              name="price"
              value={datos.price}
              onChange={handleChange}
              required
            />

            <FormControl fullWidth>
              <InputLabel id="category-label" shrink>
                Categoría
              </InputLabel>
              <Select
                labelId="category-label"
                label="Categoría"
                variant="outlined"
                name="id_category"
                value={datos.id_category}
                onChange={handleChange}
                displayEmpty
                required
              >
                <MenuItem value="" disabled>
                  <em>selecciona una categoria</em>
                </MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id_category} value={categoria.id_category}>
                    {categoria.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id="in_stock"
                    label="en stock"
                    variant="outlined"
                    name="in_stock"
                    checked={checked}
                    value={datos.in_stock}
                    onChange={handleChangeChecked}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="en stock"
              />
            </FormGroup>

            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Product;
