import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CronometroProps from "../interfaces/CronometroProps";

export default function Cronometro(props: CronometroProps) {
  const calculateTimeLeft = () => {
    const diferenca = props.tempoLimite - Math.floor(Date.now() / 1000);
    let tempoRestante = {};

    if (diferenca > 0) {
      tempoRestante = {
        horas: Math.floor((diferenca / (60 * 60)) % 24),
        minutos: Math.floor((diferenca / 60) % 60),
      };
    }

    return tempoRestante;
  };

  const [tempoRestante, setTempoRestante] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTempoRestante(calculateTimeLeft());
    }, 1000);
    // Limpe o intervalo se o componente for desmontado
    return () => clearTimeout(timer);
  });

  return (
    <Typography>
      {/* @ts-ignore */}
      Tempo restante: {tempoRestante.horas}:{tempoRestante.minutos}
    </Typography>
  );
}
