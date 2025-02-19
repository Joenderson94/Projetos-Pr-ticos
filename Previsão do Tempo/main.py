import requests

API_KEY= 'f3757e0ea24fbe00078bd47d8bbcb344'
cidade = 'ilhéus'
link = f'https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={API_KEY}'

requisicao = requests.get(link)                 #requests.get(link).json()['weather'][0]['description']
requisicao_dic = requisicao.json()
descricao = requisicao_dic['weather'][0]['description']
temperatura = float(requisicao_dic['main']['temp']) - 273.15
print(f'{descricao}, {temperatura:.2f}')
