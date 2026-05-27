import { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

/**
 * Página de modificación de categoría.
 * Carga la categoría seleccionada y permite actualizar sus campos.
 *
 * @returns {JSX.Element} Formulario de edición de categoría.
 */
function CategoryModify() {
  const params = useParams();
  const [datos, setDatos] = useState({
    id_category: params.id_category,
    category_name: "",
    description: "",
    like_count: 0,
    seasonal_product_available: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(apiUrl + "/category/" + datos.id_category);
        const data = await response.json();

        setDatos({
          ...data.datos,
          like_count: data.datos.like_count ?? 0,
        });
      } catch (error) {
        console.error("Error cargando categoria", error);
      }
    };

    fetchCategorias();
  }, [datos.id_category]);

  /**
   * Envía los cambios de la categoría al backend.
   *
   * @param {React.FormEvent<HTMLFormElement>} e Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + "/category/" + datos.id_category, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        alert("Se guardaron los cambios");
        navigate(-1);
      } else {
        const error = await response.json();
        alert(error.mensaje);
      }
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      alert("Error al guardar los cambios.");
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
      <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mx: 2 }}>
            <TextField
              id="nombre"
              label="Nombre de categoria"
              variant="outlined"
              name="category_name"
              value={datos.category_name || ""}
              onChange={handleChange}
              required
            />
            <TextField
              id="descripcion"
              label="descripcion"
              variant="outlined"
              name="description"
              value={datos.description || ""}
              onChange={handleChange}
              required
            />
            <TextField
              type="number"
              id="popularidad"
              label="popularidad"
              variant="outlined"
              name="like_count"
              value={datos.like_count ?? 0}
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
                    checked={datos.seasonal_product_available || false}
                    onChange={handleChangeChecked}
                  />
                }
                label="temporada"
              />
            </FormGroup>

            <Button variant="contained" type="submit">
              Guardar cambios
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default CategoryModify;
