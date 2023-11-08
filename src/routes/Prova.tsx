import { Container, Box, Paper, Fab } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import Enunciado from "../components/Enunciado";
import Alternativas from "../components/Alternativas";
import { useLocation } from "react-router-dom";

export default function Prova() {
  const location = useLocation();
  const prova = location.state.prova;
  const [questaoAtual, setQuestaoAtual] = useState(0);

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ padding: "5px" }}>
          <Enunciado
            questaoAtual={questaoAtual}
            numeroQuestao={prova[questaoAtual].numero}
            enunciado={prova[questaoAtual].enunciado}
            localizacaoAssets={prova[questaoAtual].localizacaoAssets}
          />
          <Alternativas
            questaoAtual={questaoAtual}
            numeroQuestao={prova[questaoAtual].numero}
            localizacaoAssets={prova[questaoAtual].localizacaoAssets}
            alternativas={prova[questaoAtual].alternativas}
            gabarito={prova[questaoAtual].gabarito}
          />
        </Paper>
      </Container>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          position: "fixed",
          bottom: "35px",
          right: "50px",
        }}
      >
        <Fab
          size="medium"
          onClick={() => {
            if (questaoAtual > 0) setQuestaoAtual(questaoAtual - 1);
          }}
        >
          <ArrowBack />
        </Fab>
        <Fab
          size="medium"
          onClick={() => {
            if (questaoAtual < prova.length - 1)
              setQuestaoAtual(questaoAtual + 1);
          }}
        >
          <ArrowForward />
        </Fab>
      </Box>
    </>
  );
}
