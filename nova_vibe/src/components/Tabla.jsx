import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

/**
 * Componente reutilizable de tabla para mostrar filas con acciones.
 *
 * @param {Object} props
 * @param {Array<{field:string,header:string,align:string,render:function}>} props.columns Definición de columnas.
 * @param {Array<Object>} props.rows Filas que se mostrarán en la tabla.
 * @param {Array<{icon:JSX.Element,color:string,onClick:function}>} [props.actions] Acciones disponibles para cada fila.
 * @returns {JSX.Element} Tabla renderizada con acciones opcionales.
 */
function Tabla({ columns, rows, actions }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field} align={col.align || "left"}>
                {col.header}
              </TableCell>
            ))}
            {actions && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell key={col.field}>
                  {col.render ? col.render(row) : row[col.field]}
                </TableCell>
              ))}
              {actions && (
                <TableCell>
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      color={action.color}
                      sx={{ mx: 0.5 }}
                      onClick={() => action.onClick(row)}
                    >
                      {action.icon}
                    </Button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tabla;
