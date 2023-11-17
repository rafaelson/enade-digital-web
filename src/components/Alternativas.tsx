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

  useEffect(() => {
    if (props.respostas[props.questaoAtual] !== undefined) {
      if (props.respostas[props.questaoAtual].resposta != "") {
        setValue(props.respostas[props.questaoAtual].resposta);
        trocarCorBorda(props.respostas[props.questaoAtual].resposta);
      }
    } else {
      setValue("");
      trocarCorBorda("");
    }
  }, [props.questaoAtual]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    border: "2px",
    borderStyle: "solid",
  }));

  const trocarCorBorda = (value: string) => {
    const alternativasCores = alternativaCor;
    if (value != "") {
      //@ts-ignore
      alternativasCores[value] = "#0288d1";
      for (const alternativa in alternativasCores) {
        if (alternativa != value) {
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
    trocarCorBorda(value);
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
              />
            </Item>

            <Item sx={{ borderColor: alternativaCor.b }}>
              <FormControlLabel
                value="b"
                control={<Radio />}
                label={checaImagem(props.alternativas[1])}
                sx={{ width: "100%" }}
              />
            </Item>
            <Item sx={{ borderColor: alternativaCor.c }}>
              <FormControlLabel
                value="c"
                control={<Radio />}
                label={checaImagem(props.alternativas[2])}
                sx={{ width: "100%" }}
              />
            </Item>
            <Item sx={{ borderColor: alternativaCor.d }}>
              <FormControlLabel
                value="d"
                control={<Radio />}
                label={checaImagem(props.alternativas[3])}
                sx={{ width: "100%" }}
              />
            </Item>
            <Item sx={{ borderColor: alternativaCor.e }}>
              <FormControlLabel
                value="e"
                control={<Radio />}
                label={checaImagem(props.alternativas[4])}
                sx={{ width: "100%" }}
              />
            </Item>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
