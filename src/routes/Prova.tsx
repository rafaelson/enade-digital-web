import { Container, Box, Paper, Fab } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import Enunciado from "../components/Enunciado";
import Alternativas from "../components/Alternativas";
import AlertaConclusao from "../components/AlertaConclusao";
import { useLocation } from "react-router-dom";

export default function Prova() {
  const location = useLocation();
  const prova = location.state.prova;
  const [questaoAtual, setQuestaoAtual] = useState(0);
  //@ts-ignore
  const [respostas, setRespostas] = useState(Array.from(Array(prova.length)));
  const [alertaConclusao, setAlertaConclusao] = useState(false);

  const handleClickOpen = () => {
    setAlertaConclusao(true);
  };

  const handleClose = async (provaFinalizada: boolean) => {
    if (provaFinalizada) {
      setAlertaConclusao(false);
      const myHeaders = new Headers();
      myHeaders.append("x-api-key", apiKey);
      myHeaders.append("Content-Type", "application/json; charset=utf-8");
      const response = await fetch(`${api}`, {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: JSON.stringify(
          respostas.filter((element) => element !== undefined)
        ),
        redirect: "follow",
      });
      const responseJson = await response.text();
      const responseObj = JSON.parse(responseJson);
      console.log(responseObj);
    }
    setAlertaConclusao(false);
  };

  return (
    <>
      <AlertaConclusao
        alertaConclusao={alertaConclusao}
        handleClose={handleClose}
      />
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
            idQuestao={prova[questaoAtual].id}
            numeroQuestao={prova[questaoAtual].numero}
            localizacaoAssets={prova[questaoAtual].localizacaoAssets}
            alternativas={prova[questaoAtual].alternativas}
            gabarito={prova[questaoAtual].gabarito}
            provaId={prova[questaoAtual].provaId}
            respostas={respostas}
            setRespostas={setRespostas}
          />
        </Paper>
      </Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          position: "fixed",
          bottom: "35px",
          right: "50px",
        }}
      >
        <Box display="flex" gap="15px">
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
        <Fab variant="extended" color="success" onClick={handleClickOpen}>
          Finalizar
        </Fab>
      </Box>
    </>
  );
}
