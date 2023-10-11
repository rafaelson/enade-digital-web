import { Box, Typography } from "@mui/material";
import EnunciadoProps from "../interfaces/EnunciadoProps";

export default function Enunciado(props: EnunciadoProps) {
  const formataString = (str: string) => {
    const parts = str.split("\n");
    return parts.map((part, index) => {
      const imageCheck = part.match(/IMAGE-(\d+)/);

      if (imageCheck) {
        return <img src={`../public/${imageCheck[1]}.jpg`} />;
      } else {
        return (
          <>
            <Typography sx={{ marginBottom: "5px" }} key={index}>
              {part}
            </Typography>
          </>
        );
      }
    });
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
