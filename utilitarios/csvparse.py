import csv
import re
import json

with open("prova-arrumada.json", "r", encoding="utf-8") as prova_json:
    prova = json.load(prova_json)
    
    with open("tabula-2021_GB_bacharelado_sistema_informacao.csv", newline="") as csvfile:
        csvreader = csv.DictReader(csvfile)

        # filtrado = [item for item in csvreader if 'discursiva' in item['Item']]
        prova_com_gabarito = []
        for row in csvreader:
            if "DISCURSIVA" in row["Item"]:
                continue
            numbers = re.findall(r'\d+', row['Item'])
            resposta = row['Gabarito']
            for questao in prova:
                if numbers[0] == questao["numeroQuestao"] or f"0{numbers[0]}" == questao["numeroQuestao"]:
                    questao["gabarito"] = resposta.lower()
                    prova_com_gabarito.append(questao)

        with open("prova-arrumada-gabarito.json", "w", encoding="utf-8") as prova_arrumada_gabarito_json:
            json.dump(prova_com_gabarito, prova_arrumada_gabarito_json, ensure_ascii=False, indent=2)
            

            

            





