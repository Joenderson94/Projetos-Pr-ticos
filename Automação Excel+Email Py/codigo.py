import os
import pandas as pd
caminho = 'bases/'
arquivos = os.listdir(caminho)
print(arquivos)

tabela_consolidada = pd.DataFrame()

for nome_arquivo in arquivos:
    tabela_vendas = pd.read_csv(os.path.join(caminho, nome_arquivo))
    print(tabela_vendas)