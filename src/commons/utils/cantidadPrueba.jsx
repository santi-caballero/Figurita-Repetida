import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SingleProduct from "../SingleProduct";
import Comprar from "./Comprar";

export default function BasicSelect({ producto }) {
  const [cantidad, setCantidad] = React.useState("");

  const handleChange = (event) => {
    setCantidad(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cantidad}
            label="Cantidad"
            onChange={handleChange}
          >
            <MenuItem value={1}>Ten</MenuItem>
            <MenuItem value={2}>Twenty</MenuItem>
            <MenuItem value={3}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Comprar producto={producto} cantidad={cantidad} />
    </>
  );
}
