import {
  Container,
  Box,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Stack,
  Paper,
  Fab,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import "./App.css";

function App() {
  const string =
    'ENADE 2021 - \nA chance de uma criança de baixa renda ter um futuro melhor que a realidade em que nasceu está, em maior ou menor grau, relacionada à escolaridade e ao nível de renda de seus pais. Nos países ricos, o "elevador social" anda mais rápido. Nos emergentes, mais devagar. No Brasil, ainda mais lentamente. O país ocupa a segunda pior posição em um estudo sobre mobilidade social feito pela Organização para a Cooperação e Desenvolvimento Econômico (OCDE), em 2018, com dados de 30 países.\n\nSegundo os resultados, seriam necessárias nove gerações para que os descendentes de um brasileiro entre os 10% mais pobres atingissem o nível médio de rendimento do país. A estimativa é a mesma para a África do Sul e só perde para a Colômbia, onde o período de ascensão levaria 11 gerações. Mais de 1/3 daqueles que nascem entre os 20% mais pobres no Brasil permanece na base da pirâmide, enquanto apenas 7% consegue chegar aos 20% mais ricos. Filhos de pais na base da pirâmide têm dificuldade de acesso à saúde e maior probabilidade de frequentar uma escola com ensino de baixa qualidade.\n\nA educação precária, em geral, limita as opções para esses jovens no mercado de trabalho. Sobram-lhes empregos de baixa remuneração, em que a possibilidade de crescimento salarial para quem tem pouca qualificação é pequena – e a chance de perpetuação do ciclo de pobreza, grande.\nLEMOS, V. Brasil é o segundo pior em mobilidade social em ranking de 30 países. BBC News Brasil, 15 jun. 2018 (adaptado).\n\nA partir das informações apresentadas, é correto afirmar que';

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ padding: "5px" }}>
          <Box sx={{ height: "50vh" }}>
            <Box sx={{ minHeight: "6vh" }}>
              <Typography variant="h4">Questão 01</Typography>
            </Box>
            <Box sx={{ maxHeight: "90%", overflowY: "auto" }}>
              {formataString(string)}
            </Box>
          </Box>
          <Box
            sx={{
              height: "45vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ maxHeight: "100%" }}>
              <RadioGroup>
                <Stack spacing={1} useFlexGap>
                  <Item>
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="a) o fator ambiental e o fator demográfico afetam a mobilidade social observada, sendo ela menor nos países que apresentam as maiores taxas de natalidade."
                    />
                  </Item>

                  <Item>
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="b) a baixa organização social dos economicamente menos favorecidos determina a baixa mobilidade social da base para o topo da pirâmide."
                    />
                  </Item>
                  <Item>
                    <FormControlLabel
                      value="c"
                      control={<Radio />}
                      label="c) a mobilidade social é caracterizada por um fator ancestral que se revela ao longo das gerações, sendo um limitador da eficácia de políticas públicas de redução das desigualdades sociais."
                    />
                  </Item>
                  <Item>
                    <FormControlLabel
                      value="d"
                      control={<Radio />}
                      label="d) a análise de mobilidade social permite a observação de um ciclo vicioso, que se caracteriza por uma subida nas camadas sociais seguida de uma queda, repetindo-se esse ciclo de modo sucessivo."
                    />
                  </Item>
                  <Item>
                    <FormControlLabel
                      value="e"
                      control={<Radio />}
                      label="e) a ascensão social depende de fatores viabilizadores que estão fora do alcance das camadas pobres, o que ocasiona conflitos sociais em busca do acesso a tais fatores."
                    />
                  </Item>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
        </Paper>
      </Container>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          position: "fixed",
          bottom: "35px",
          right: "50px",
        }}
      >
        <Fab size="medium">
          <ArrowBack />
        </Fab>
        <Fab size="medium">
          <ArrowForward />
        </Fab>
      </Box>
    </>
  );
}

export default App;
