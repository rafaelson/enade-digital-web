import { Container, Box, Paper, Fab, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import Enunciado from "../components/Enunciado";
import Alternativas from "../components/Alternativas";
import AlertaConclusao from "../components/AlertaConclusao";
import { useLocation, useNavigate } from "react-router-dom";
import Cronometro from "../components/Cronometro";
import AlertaSair from "../components/AlertaSair";
import Resposta from "../interfaces/Resposta";
import Resultado from "../interfaces/Resultado";

export default function Prova() {
  const navigate = useNavigate();
  const location = useLocation();
  const prova = location.state.prova;
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<Resposta[]>(
    Array.from(Array(prova.length))
  );
  const [resultado, setResultado] = useState<Resultado | undefined>(undefined);
  const [alertaConclusao, setAlertaConclusao] = useState(false);
  const [resultadoVisivel, setResultadoVisivel] = useState<
    "visible" | "hidden"
  >("hidden");
  const [alertaSair, setAlertaSair] = useState(false);

  const handleClickOpen = () => {
    if (resultado != undefined) setAlertaSair(true);
    else setAlertaConclusao(true);
  };

  const handleAlertaConclusaoClose = async (provaFinalizada: boolean) => {
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
      const resultado = JSON.parse(responseJson);
      console.log(resultado);
      setResultado(resultado);
      setQuestaoAtual(0);
      setResultadoVisivel("visible");
    }
    setAlertaConclusao(false);
  };

  const handleAlertaSairClose = (sair: boolean) => {
    setAlertaSair(false);
    if (sair) {
      navigate("/");
    }
  };

  return (
    <>
      <AlertaConclusao
        alertaConclusao={alertaConclusao}
        handleClose={handleAlertaConclusaoClose}
      />
      <AlertaSair alertaSair={alertaSair} handleClose={handleAlertaSairClose} />

      <Box
        position={"absolute"}
        left={0}
        top={0}
        marginLeft="10px"
        marginTop="10px"
        visibility={resultadoVisivel}
      >
        <Typography>
          Acertos: {resultado !== undefined ? resultado.acertos : "Indefinido"}
        </Typography>
        <Typography>
          Total de questões:
          {resultado !== undefined ? resultado.totalQuestoes : "Indefinido"}
        </Typography>
        <Typography>
          Taxa de Acertos:
          {resultado !== undefined
            ? ((resultado.acertos / resultado.totalQuestoes) * 100).toFixed(2) +
              "%"
            : "Indefinido"}
        </Typography>
      </Box>
      <Box
        position={"absolute"}
        right={0}
        top={0}
        marginRight="10px"
        marginTop="10px"
      >
        <Cronometro
          tempoLimite={Number.parseInt(localStorage.getItem("tempoExpiracao")!)}
        />
      </Box>
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
            provaId={prova[questaoAtual].provaId}
            respostas={respostas}
            resultado={resultado}
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
        <Fab variant="extended" color="primary" onClick={handleClickOpen}>
          {resultado !== undefined ? "Sair" : "Finalizar"}
        </Fab>
      </Box>
    </>
  );
}
