import json
import boto3
from ulid import ULID
import time

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    try:
        
        
        tabela = dynamodb.Table('enade-digital-provas')
        chave_primaria = event['queryStringParameters']['id']
        
        atributos_desejados = ['id', 'ano', 'localizacaoAssets', 'questoes']
        
        

        response = tabela.query(
            KeyConditionExpression='id = :valor',
            ExpressionAttributeValues={
                ':valor': chave_primaria
            },
            ProjectionExpression=', '.join(atributos_desejados)
        )
        
        items = response['Items']
        
        print(items)
        
        for questao in items[0]['questoes']:
            questao.pop("gabarito", None)
        
        
        response_geral = tabela.scan(
            FilterExpression='ano = :ano and curso = :curso',
            ExpressionAttributeValues={
                ':ano': items[0]['ano'],
                ':curso': 'Formação Geral'
            },
            ProjectionExpression=', '.join(atributos_desejados)
        )
        
        items_geral = response_geral['Items']
        
        for questao in items_geral[0]['questoes']:
            questao.pop("gabarito", None)
        
        list_json = [items_geral, items]
        
        list_json[0][0]['ano'] = str(list_json[0][0]['ano'])
        list_json[1][0]['ano'] = str(list_json[1][0]['ano'])
        
        
        cookie_dict = {
            'idSessao': str(ULID()),
            'provas': [list_json[0][0]['id'], list_json[1][0]['id']],
            'tempoExpiracao': int(time.time()) + 14400
        }

        list_json.append(cookie_dict)

        tabela_sessao = dynamodb.Table('enade-digital-sessoes')
        tabela_sessao.put_item(Item=cookie_dict)

       
        return {
            'statusCode': 200,
            'headers': {
                "content-type":"application/json; charset=utf-8", "Access-Control-Allow-Origin": "*"},
            'body': json.dumps(list_json)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }
