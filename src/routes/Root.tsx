import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "../index.css";
import logo from "../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const [curso, setCurso] = useState(""); // id no dynamodb
  const navigate = useNavigate();
  const handleChange = (event: SelectChangeEvent) => {
    setCurso(event.target.value as string);
  };

  const handleClick = async () => {
    if (curso != "") {
      const myHeaders = new Headers();
      myHeaders.append("x-api-key", apiKey);
      const response = await fetch(`${api}${curso}`, {
        method: "GET",
        mode: "cors",
        headers: myHeaders,
        redirect: "follow",
      });
      const responseJson = await response.text();
      const responseObj = JSON.parse(responseJson);
      localStorage.setItem("sessao", responseObj[2].idSessao);
      localStorage.setItem("provas", responseObj[2].provas);
      localStorage.setItem("tempoExpiracao", responseObj[2].tempoExpiracao);

      const prova = [responseObj[0][0], responseObj[1][0]];

      const soQuestoes = [];
      for (const questao of prova[0].questoes) {
        questao.provaId = prova[0].id;
        questao.localizacaoAssets = prova[0].localizacaoAssets;
        soQuestoes.push(questao);
      }

      for (const questao of prova[1].questoes) {
        questao.provaId = prova[1].id;
        questao.localizacaoAssets = prova[1].localizacaoAssets;
        soQuestoes.push(questao);
      }

      console.log(soQuestoes);

      navigate("/prova", { state: { prova: soQuestoes } });
    }
  };

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
          <img src={logo}></img>
          <FormControl>
            <InputLabel id="prova-dropdown">Escolha sua prova</InputLabel>
            <Select
              labelId="prova-dropdown"
              label="Escolha sua prova"
              value={curso}
              onChange={handleChange}
            >
              <MenuItem value="01HE9DCMHR2GF5KRF5MXJ510XS">
                Sistemas de Informação - 2021
              </MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" size="large" onClick={handleClick}>
            Iniciar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
