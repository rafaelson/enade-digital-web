import json
import boto3
import time

dynamodb = boto3.resource('dynamodb')


def lambda_handler(event, context):
    try:
        
        tabela_provas = dynamodb.Table('enade-digital-provas')
        tabela_sessao = dynamodb.Table('enade-digital-sessoes')
        id_sessao = event['queryStringParameters']['sessao']
        respostas = json.loads(event['body'])
        
        print(id_sessao)
        print(respostas)

        
      

        
        response = tabela_sessao.query(
            KeyConditionExpression='idSessao = :valor',
            ExpressionAttributeValues={
                ':valor': id_sessao
            },
        )
        
        sessao = response['Items']
        if int(time.time()) > int(sessao[0]['tempoExpiracao']):
            return {
            'statusCode': 401,
            'headers': {
                "content-type":"application/json; charset=utf-8", "Access-Control-Allow-Origin": "*"},
            'body': "Tempo da prova expirado! Inicie novamente."
            }
        
        
        
        id_prova_1 = sessao[0]['provas'][0]
        id_prova_2 = sessao[0]['provas'][1]
        

        atributos_desejados = ['questoes']

        response = tabela_provas.query(
            KeyConditionExpression='id = :valor',
            ExpressionAttributeValues={
                ':valor': id_prova_1
            },
            ProjectionExpression=', '.join(atributos_desejados)
        )
        
        
        prova_1 = response['Items']
        
        
        respostas_dict = {resposta['questaoId']: resposta['resposta'] for resposta in respostas}

        
        questoes = []
        acertos = 0
        totalQuestoes = len(prova_1[0]["questoes"])
        
        
        
        for questao in prova_1[0]["questoes"]:
            questaoId = questao["id"]
            gabarito = questao["gabarito"]
            resposta = respostas_dict.get(questaoId)
            questao_correta = gabarito == resposta if resposta is not None else False
            if questao_correta:
                acertos += 1
            questoes.append({
                'id': questaoId,
                'gabarito': gabarito,
                'correta': questao_correta
            })
 

        
        
        
        response = tabela_provas.query(
            KeyConditionExpression='id = :valor',
            ExpressionAttributeValues={
                ':valor': id_prova_2
            },
            ProjectionExpression=', '.join(atributos_desejados)
        )
        
        prova_2 = response['Items']
        totalQuestoes += len(prova_2[0]["questoes"])
        

        
        
        
        
        for questao in prova_2[0]["questoes"]:
            questaoId = questao["id"]
            gabarito = questao["gabarito"]
            resposta = respostas_dict.get(questaoId)
            questao_correta = gabarito == resposta if resposta is not None else False
            if questao_correta:
                acertos += 1
            questoes.append({
                'id': questaoId,
                'gabarito': gabarito,
                'correta': questao_correta
            })
        

        resultado = {'acertos': acertos, 'totalQuestoes': totalQuestoes, 'questoes': questoes}

        print(resultado)
        
        return {
            'statusCode': 200,
            'headers': {
                "content-type":"application/json; charset=utf-8", "Access-Control-Allow-Origin": "*"},
            'body': json.dumps(resultado)
        }
       
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }
