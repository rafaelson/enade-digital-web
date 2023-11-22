import Questao from "./Questao";

export default interface Resultado {
  acertos: number;
  totalQuestoes: number;
  questoes: Questao[];
}
