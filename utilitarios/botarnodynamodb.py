import json
import boto3
from ulid import ULID

# # Configurar a conexão com o DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

# # Nome da tabela no DynamoDB
tabela_provas = dynamodb.Table('enade-digital-provas')

def numero_para_letra(numero):
    if 0 <= numero <= 4:
        return chr(ord('a') + numero)
    else:
        return None

def adicionar_alternativa(alternativa, index):
    alternativa_item = {
        'id': str(ULID()),
        'letra': numero_para_letra(index),
        'alternativa': alternativa
    }
    return alternativa_item

def adicionar_questao(questao):
    questao_item = {
        'id': str(ULID()),
        'numero': questao['numeroQuestao'],
        'enunciado': questao['enunciado'],
        'gabarito': questao['gabarito'],
        'alternativas': [adicionar_alternativa(alternativa, index) for index, alternativa in enumerate(questao['alternativas'])]
    }
    return questao_item

# Leitura do arquivo JSON
with open('prova-arrumada-gabarito.json', 'r', encoding='utf-8') as file:
    prova = json.load(file)
    # prova_list = []
    # for provajson in prova:
    #     for questaojson in provajson:
    #         prova_list.append(json.loads(questaojson))
    # prova = prova_list 

# Inserção dos dados no DynamoDB

prova_item = {
        'id': str(ULID()),
        'ano': 2021,
        'curso': 'Sistemas de Informação',
        'localizacaoAssets': 'https://enade-digital-assets.s3.amazonaws.com/provas/2021/sistemasinformacao/',
        'questoes': [adicionar_questao(questao) for questao in prova]
}
    
#Inserir o item da prova na tabela "Provas"
tabela_provas.put_item(Item=prova_item)
