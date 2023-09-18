import { Box, Typography } from "@mui/material";
import EnunciadoProps from "../interfaces/EnunciadoProps";

export default function Enunciado(props: EnunciadoProps) {
  const formataString = (str: string) => {
    const parts = str.split("\n");
    return parts.map((part, index) => (
      <>
        <Typography sx={{ marginBottom: "5px" }} key={index}>
          {part}
        </Typography>
      </>
    ));
  };

  return (
    <Box sx={{ height: "50vh" }}>
      <Box sx={{ minHeight: "6vh" }}>
        <Typography variant="h4">Questão {props.numeroQuestao}</Typography>
      </Box>
      <Box sx={{ maxHeight: "90%", overflowY: "auto" }}>
        {formataString(props.enunciado)}
      </Box>
    </Box>
  );
}
