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

  useEffect(() => setValue(""), [props.questaoAtual]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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
            <Item>
              <FormControlLabel
                value="a"
                control={<Radio />}
                label={checaImagem(props.alternativas[0])}
                sx={{ width: "100%" }}
              />
            </Item>

            <Item>
              <FormControlLabel
                value="b"
                control={<Radio />}
                label={checaImagem(props.alternativas[1])}
                sx={{ width: "100%" }}
              />
            </Item>
            <Item>
              <FormControlLabel
                value="c"
                control={<Radio />}
                label={checaImagem(props.alternativas[2])}
                sx={{ width: "100%" }}
              />
            </Item>
            <Item>
              <FormControlLabel
                value="d"
                control={<Radio />}
                label={checaImagem(props.alternativas[3])}
                sx={{ width: "100%" }}
              />
            </Item>
            <Item>
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
