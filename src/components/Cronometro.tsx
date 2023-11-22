import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CronometroProps from "../interfaces/CronometroProps";

export default function Cronometro(props: CronometroProps) {
  const calcularTempoRestante = () => {
    const diferenca = props.tempoLimite - Math.floor(Date.now() / 1000);
    const tempoRestante = { horas: 0, minutos: 0 };

    if (diferenca > 0) {
      tempoRestante.horas = Math.floor((diferenca / (60 * 60)) % 24);
      tempoRestante.minutos = Math.floor((diferenca / 60) % 60);
    }

    return tempoRestante;
  };

  const [tempoRestante, setTempoRestante] = useState(calcularTempoRestante());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTempoRestante(calcularTempoRestante());
    }, 1000);
    // Limpe o intervalo se o componente for desmontado
    return () => clearTimeout(timer);
  });

  return (
    <Typography>
      Tempo restante: {tempoRestante.horas}:{tempoRestante.minutos}
    </Typography>
  );
}
