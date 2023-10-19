import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import "../index.css";

export default function Root() {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={1}
        sx={{ height: "65%", width: "55%", backgroundColor: "#e5eaf2" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          // paddingLeft="45px"
          // paddingRight="45px"
          padding="15%"
          gap="25px"
        >
          <img src="../../public/logo.svg"></img>
          <FormControl>
            <InputLabel id="prova-dropdown">Escolha sua prova</InputLabel>
            <Select labelId="prova-dropdown" label="Escolha sua prova">
              <MenuItem>Teste</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
}
