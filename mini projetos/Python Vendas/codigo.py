import os
import pandas as pd


def abaterProduto(nome, quantidade, df):
    filtro = df[df['Produto'] == nome]
    indices_para_remover = filtro.index[:quantidade]
    df.drop(indices_para_remover, inplace=True)


tot_Vendas = pd.DataFrame()
tot_Devolucoes = pd.DataFrame()

caminho = 'Vendas/'
arquivos = os.listdir(caminho)

for pasta in arquivos:
    caminho_completo = os.path.join(caminho, pasta)

    if pasta.startswith('Devolucoes'):
        try:
            tabela_devolucoes = pd.read_csv(caminho_completo)
            tot_Devolucoes = pd.concat(
                [tot_Devolucoes, tabela_devolucoes], ignore_index=True)

        except:
            print('Erro ao abrir e adicionar a lista concatenada')
    elif pasta.startswith('Vendas'):
        try:
            tabela_vendas = pd.read_csv(caminho_completo)
            tot_Vendas = pd.concat(
                [tot_Vendas, tabela_vendas], ignore_index=True)

        except:
            print('Erro ao abrir e adicionar a lista concatenada')


tot_Vendas = tot_Vendas.sort_values(by='Produto')
tot_Devolucoes = tot_Devolucoes.sort_values(by='Produto')

tot_Vendas = tot_Vendas.reset_index(drop=True)
tot_Devolucoes = tot_Devolucoes.reset_index(drop=True)

tot_Devolucoes.to_excel('Devoluções.xlsx', index=False)
tot_Vendas.to_excel('Vendas.xlsx', index=False)


itensDevolução = tot_Devolucoes['Produto'].value_counts()


df = pd.read_excel('Vendas.xlsx')

for i in range(len(itensDevolução)):
    qtdProduto = int(itensDevolução.values[i])
    nomeProduto = itensDevolução.index[i]
    abaterProduto(nomeProduto, qtdProduto, df)

df.to_excel('Vendas.xlsx', index=False)

##
