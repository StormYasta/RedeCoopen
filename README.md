# Rede Coopen — Protótipo de experiência

Protótipo navegável de uma rede de oportunidades para cooperados da Escola Cooperativa Dr. Zerbini (São José do Rio Preto).

> **Projeto conceitual independente e não oficial.** Todo conteúdo, empresas, perfis, indicadores e oportunidades exibidos são **fictícios** e utilizados exclusivamente para avaliação do produto com o conselho.

## Objetivo

Testar a experiência de descoberta de profissionais e empresas, ofertas entre cooperados, mural de necessidades dos membros e demandas institucionais da cooperativa antes de desenvolver backend.

## Tecnologias

HTML, CSS e JavaScript puro. Sem dependências, serviços externos obrigatórios, backend, autenticação real ou banco de dados.

## Publicar no GitHub Pages

1. Abra **Settings → Pages** neste repositório.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch `main`, pasta `/(root)` e clique em **Save**.
4. Após o deploy, acesse `https://stormyasta.github.io/RedeCoopen/`.

O site também pode ser testado abrindo `index.html` diretamente em um navegador.

## Funcionalidades demonstrativas

- Início com categorias, demandas e perfis em destaque.
- Busca textual e filtros de categorias e tipo de perfil.
- Perfil detalhado de profissionais e empresas; favoritos locais.
- Vitrine de condições especiais para cooperados.
- Mural com demandas dos cooperados e demandas institucionais simuladas.
- Formulário de publicação de demanda, salvo apenas no navegador (`localStorage`).
- Edição de perfil demonstrativo, salva somente no navegador.
- Visão de gestão com fluxo fictício de moderação.

## Princípios da experiência no celular

O protótipo foi adaptado para cooperados com pouca familiaridade com tecnologia:

- Página inicial em linguagem direta: **Encontrar um serviço**, **Preciso contratar alguém**, **Divulgar meu trabalho**.
- Barra fixa com quatro destinos: **Início**, **Buscar**, **Pedidos** e **Meu perfil**.
- Busca sempre visível na parte superior; filtros avançados recolhidos até o usuário precisar deles.
- Botões e campos maiores, com textos visíveis em vez de depender somente de ícones.
- Funciona sem aplicativo instalado; basta abrir pelo navegador.

### Teste de usabilidade sugerido

Mostre a versão mobile a três ou mais pessoas que não conhecem o protótipo, sem dar instruções. Peça que tentem: (1) achar alguém que instala câmeras, (2) publicar uma necessidade fictícia e (3) montar um cartão de apresentação. Observe onde hesitam, quanto tempo levam e se pedem ajuda. Ajuste a interface com base nas dificuldades reais.

## Limitações deliberadas

Nenhum fluxo representa uma contratação real. Não há contas, dados pessoais reais, chat, pagamentos, validação de cooperados, envio de solicitações ou comunicação com a cooperativa. Todos os dados locais podem ser apagados nas configurações do navegador.

## Estrutura

```text
index.html
assets/
  styles.css
  mock-data.js
  app.js
.nojekyll
README.md
```

## Próximas validações

1. Cooperados conseguem encontrar facilmente serviços relevantes?
2. Faz sentido separar empresas de profissionais autônomos?
3. Qual informação precisa aparecer no perfil para gerar confiança?
4. Como a Coopen deverá publicar e selecionar fornecedores?
5. Quais regras de privacidade, divulgação e moderação serão obrigatórias?
