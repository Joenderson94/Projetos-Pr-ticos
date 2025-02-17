import os
import pandas as pd
caminho = 'bases/'
arquivos = os.listdir(caminho)
print(arquivos)

tabela_consolidada = pd.DataFrame()

for nome_arquivo in arquivos:
    tabela_vendas = pd.read_csv(os.path.join(caminho, nome_arquivo))
     #pega coluna da data que está em dias e converte para um formato usual com base na data ref
    print(tabela_vendas)