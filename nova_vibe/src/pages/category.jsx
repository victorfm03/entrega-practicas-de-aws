import { useState } from "react";
import {
  Typography,
  TextField,
  Stack,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

/**
 * Formulario para crear una nueva categoría.
 *
 * @returns {JSX.Element} Formulario de alta de categoría.
 */
function Category() {
  const [datos, setDatos] = useState({
    category_name: "",
    description: "",
    like_count: "",
    seasonal_product_available: false,
  });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  /**
   * Envía la nueva categoría al backend.
   *
   * @param {React.FormEvent<HTMLFormElement>} e Evento de envío.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + "/category", {
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
      console.error("Error al crear categoría:", error);
      alert("Error al crear la categoría.");
    }
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

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
        Alta de categorias
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
              label="Nombre de categoria"
              variant="outlined"
              name="category_name"
              value={datos.category_name}
              onChange={handleChange}
              required
            />
            <TextField
              id="descripcion"
              label="descripcion"
              variant="outlined"
              name="description"
              value={datos.description}
              onChange={handleChange}
              required
            />
            <TextField
              type="number"
              id="popularidad"
              label="popularidad"
              variant="outlined"
              name="like_count"
              value={datos.like_count}
              onChange={handleChange}
              required
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id="seasonal_product_available"
                    label="temporada"
                    variant="outlined"
                    name="seasonal_product_available"
                    checked={checked}
                    value={datos.seasonal_product_available}
                    onChange={handleChangeChecked}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="temporada"
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

export default Category;
