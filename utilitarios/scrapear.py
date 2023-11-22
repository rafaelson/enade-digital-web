import sys
from bs4 import BeautifulSoup
import requests
import re
import json

# Verifique se um argumento de linha de comando foi fornecido
if len(sys.argv) != 2:
    print("Uso: python parse_html.py <url>")
    sys.exit(1)

# Obtenha o link da linha de comando
url = sys.argv[1]

# Faça uma solicitação HTTP para obter o conteúdo da página
response = requests.get(url)

def separa_texto(texto):
    # Use uma expressão regular para separar as questões e gabaritos
    questoes = [item for item in re.split(r'(ENADE \d{4} - QUESTÃO \d{2})', texto) if item.strip() != '']

    # Combine a palavra "QUESTÃO" e o número da questão com o texto seguinte
    questoesFormatadas = []
    for i in range(0, len(questoes), 2):
        if i + 1 < len(questoes):
            questoesFormatadas.append(questoes[i] + questoes[i + 1])
        else:
            questoesFormatadas.append(questoes[i])

    return questoesFormatadas


def formata_json(questao_texto):
    # Texto da questão
    resultado = re.search(r'GABARITO\s+(.*)', questao_texto, re.IGNORECASE)
    questao_texto = re.sub(r'GABARITO\s+(.*)', '', questao_texto, flags=re.IGNORECASE)

    if resultado:
        conteudo_apos_gabarito = resultado.group(1)
        # print(conteudo_apos_gabarito)

    # Separar o número da questão
    numero_questao = re.search(r'QUESTÃO (\d+)', questao_texto).group(1)

    # Separar o enunciado removendo as alternativas
    enunciado = re.sub(r'ENADE 2021 - QUESTÃO \d+', '', questao_texto)
    enunciado = re.split(r'[A-E]\) ', enunciado, 1)[0].strip()

    # Separar as alternativas (removendo as letras A), B), C), D) e E))
    alternativas = re.findall(r'[A-E]\) ([\s\S]+?)(?=(?:[A-E]\)|$)|GABARITO)', questao_texto)
    alternativas = [re.sub(r'[A-E]\) ', '', alt).strip() for alt in alternativas]

    # Criar o objeto JSON
    questao_dict = {
        "numeroQuestao": numero_questao,
        "enunciado": enunciado,
        "alternativas": alternativas,
    }

    # Converter o objeto JSON para uma string JSON formatada
    #questao_json_string = json.dumps(questao_json, indent=2, ensure_ascii=False)

    # Imprimir o JSON resultante
    # print(questao_json_string)

    return questao_dict


def procura_baixa_imagem_alternativas(questao, numero_imagem):
    for alternativa in questao['alternativas']:
        urls_alternativa = re.findall(r'Image:\s+(https?://[^\s]+)', alternativa)
        for url_alternativa in urls_alternativa:
            response = requests.get(url_alternativa)
            if response.status_code == 200:
                filename = f"{questao['numeroQuestao']}-{numero_imagem}.jpg"
                with open(filename, 'wb') as f:
                    f.write(response.content)
                alternativa = alternativa.replace(f"Image: {url} ", f'IMAGE-{numero_imagem}')
                numero_imagem += 1

    return questao


def procura_baixa_imagem(questao):
    numero_imagem = 0
    #urls_enunciado = re.findall(r'https?://[^\s]+', questao['enunciado'])
    urls_enunciado = re.findall(r'Image:\s+(https?://[^\s]+)', questao['enunciado'])


    for index, url in enumerate(urls_enunciado):
        response = requests.get(url)
        if response.status_code == 200:
            filename =  f"{questao['numeroQuestao']}-{index}.jpg"
            with open(filename, 'wb') as f:
                f.write(response.content)
            questao['enunciado'] = questao['enunciado'].replace(f"Image: {url} ", f'IMAGE-{index}')
            numero_imagem = index
    
    numero_imagem += 1
    questao = procura_baixa_imagem_alternativas(questao, numero_imagem)


    return questao


# Verifique se a solicitação foi bem-sucedida
if response.status_code == 200:
    # Analise o HTML da página
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')

    # Substitua as imagens por parágrafos contendo seu src
    for img in soup.find_all('img'):
        new_p = soup.new_tag('p')
        new_p.string = f'Image: {img["src"]} '
        img.replace_with(new_p)

    for br in soup.find_all('br'):
        br.replace_with('\n')
    
    # Pegue todo o conteúdo de texto do documento
    text_content = soup.get_text()
    
    question_matches = re.findall(r'ENADE 2021 - QUESTÃO \d{2}', text_content)
    last_match = re.search(r'GABARITO\.?', text_content)
    if question_matches and last_match:
        first_question_match = re.search(r'ENADE 2021 - QUESTÃO \d{2}', text_content)
        last_match_index = text_content.rindex(last_match.group())
        trimmed_text = text_content[first_question_match.start():last_match_index]
        
        
        separado = separa_texto(trimmed_text)
        questoes_dict = []
        for questao_dict in separado:
            questoes_dict.append(formata_json(questao_dict))

        questoes_json = []
        for questao_json in questoes_dict:
            questoes_json.append(procura_baixa_imagem(questao_json))
            

        with open("prova.json", "w", encoding="utf-8") as arquivo_json:
            json.dump(questoes_json, arquivo_json, ensure_ascii=False, indent=2)

        #questoes_json = formata_json(separado)
        # with open('separado.json', 'w') as arquivo_json:
        #     json.dump(separado, arquivo_json)
        
        # with open("data.json", "w", encoding="utf-8") as arquivo_json:
        #     arquivo_json.write(json.dumps(questoes_json, indent=4, ensure_ascii=False))

        # with open('questoes.txt', 'w', encoding='utf-8') as file:
        #     file.write(trimmed_text)
    else:
        print("Não foram encontrados correspondências para 'ENADE 2021 - QUESTÃO XX' e 'GABARITO.'")

    #print(text_content)
else:
    print(f"A solicitação HTTP para {url} falhou com código de status {response.status_code}")
