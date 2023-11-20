import {
  Box,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Stack,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AlternativasProps from "../interfaces/AlternativasProps";
import { useEffect, useState } from "react";

export default function Alternativas(props: AlternativasProps) {
  const [value, setValue] = useState("");
  const [alternativaCor, setAlternativaCor] = useState({
    a: "initial",
    b: "initial",
    c: "initial",
    d: "initial",
    e: "initial",
  });
  const [alternativasDisabled, setAlternativasDisabled] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
  });

  useEffect(() => {
    if (props.respostas[props.questaoAtual] !== undefined) {
      const resposta = props.respostas[props.questaoAtual].resposta;
      if (resposta != "") {
        // questão marcada
        setValue(resposta);
        trocarCorBorda(resposta, "azul");
        if (props.resultado != undefined) {
          // prova finalizada
          const questao = props.resultado.questoes.find(
            //@ts-ignore
            (questao) => questao.id == props.idQuestao
          );
          if (questao) {
            let respostaCorreta;
            for (const alternativa in alternativaCor) {
              if (alternativa == questao.gabarito) {
                // acertou
                respostaCorreta = alternativa;
              }
              if (alternativa == resposta && resposta != questao.gabarito) {
                trocarCorBorda(alternativa, "vermelho");
              }
            }
            if (respostaCorreta) {
              trocarCorBorda(respostaCorreta, "verde", true);
            }
            disableAlternativas();
          }
        }
      }
    } else {
      // questão não marcada
      setValue("");
      trocarCorBorda("");
      if (props.resultado != undefined) {
        //prova finalizada
        const questao = props.resultado.questoes.find(
          //@ts-ignore
          (questao) => questao.id == props.idQuestao
        );
        if (questao) {
          for (const alternativa in alternativaCor) {
            if (alternativa == questao.gabarito) {
              trocarCorBorda(alternativa, "verde");
            }
          }
          disableAlternativas();
        }
      }
    }
  }, [props.questaoAtual, props.resultado]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    border: "3px",
    borderStyle: "solid",
  }));

  const disableAlternativas = () => {
    const novaAlternativasDisabled = alternativasDisabled;
    for (const alternativa in novaAlternativasDisabled) {
      //@ts-ignore
      novaAlternativasDisabled[alternativa] = true;
    }
    setAlternativasDisabled(novaAlternativasDisabled);
  };

  const trocarCorBorda = (value: string, cor?: string, errado?: boolean) => {
    const cores = {
      azul: "#0288d1",
      verde: "#388e3c",
      vermelho: "#d32f2f",
    };
    const alternativasCores = alternativaCor;
    if (value != "") {
      //@ts-ignore
      alternativasCores[value] = cores[cor];
      for (const alternativa in alternativasCores) {
        if (alternativa != value) {
          //@ts-ignore
          if (alternativasCores[alternativa] != "initial" && errado) {
            continue;
          }
          //@ts-ignore
          alternativasCores[alternativa] = "initial";
        }
      }
    } else {
      for (const alternativa in alternativasCores) {
        //@ts-ignore
        alternativasCores[alternativa] = "initial";
      }
    }
    setAlternativaCor(alternativasCores);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setValue(value);
    const respostasAtualizadas = [...props.respostas];
    respostasAtualizadas[props.questaoAtual] = {
      questaoId: props.idQuestao,
      resposta: value,
    };
    trocarCorBorda(value, "azul");
    props.setRespostas(respostasAtualizadas);
  };

  //@ts-ignore
  const checaImagem = (alternativa) => {
    const imageCheck = alternativa.alternativa.match(/IMAGE-(\d+)/);

    if (imageCheck) {
      return (
        <img
          src={`${props.localizacaoAssets}${props.numeroQuestao}-${imageCheck[1]}.jpg`}
        />
      );
    } else {
      return `${alternativa.letra.toUpperCase()}) ${alternativa.alternativa}`;
    }
  };

  return (
    <Box
      sx={{
        height: "45vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <FormControl sx={{ maxHeight: "100%", width: "100%" }}>
        <RadioGroup value={value} onChange={handleChange}>
          <Stack spacing={1} useFlexGap>
            <Item sx={{ borderColor: alternativaCor.a }}>
              <FormControlLabel
                value="a"
                control={<Radio />}
                label={checaImagem(props.alternativas[0])}
                sx={{ width: "100%" }}
                disabled={alternativasDisabled.a}
              />
            </Item>

            <Item sx={{ borderColor: alternativaCor.b }}>
              <FormControlLabel
                value="b"
                control={<Radio />}
                label={checaImagem(props.alternativas[1])}
                sx={{ width: "100%" }}
                disabled={alternativasDisabled.b}
              />
            </Item>
            <Item sx={{ borderColor: alternativaCor.c }}>
              <FormControlLabel
                value="c"
                control={<Radio />}
                label={checaImagem(props.alternativas[2])}
                sx={{ width: "100%" }}
                disabled={alternativasDisabled.c}
              />
            </Item>
            <Item sx={{ borderColor: alternativaCor.d }}>
              <FormControlLabel
                value="d"
                control={<Radio />}
                label={checaImagem(props.alternativas[3])}
                sx={{ width: "100%" }}
                disabled={alternativasDisabled.d}
              />
            </Item>
            <Item sx={{ borderColor: alternativaCor.e }}>
              <FormControlLabel
                value="e"
                control={<Radio />}
                label={checaImagem(props.alternativas[4])}
                sx={{ width: "100%" }}
                disabled={alternativasDisabled.e}
              />
            </Item>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
