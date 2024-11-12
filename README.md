# Teste Prático de Frontend - Integração com PokeAPI, TypeScript e Material UI

Bem-vindo ao repositório de teste prático para a posição de Desenvolvedor Frontend. Este teste avalia habilidades em TypeScript, integração com APIs REST, e uso do React. Abaixo, você encontrará uma descrição detalhada dos requisitos do projeto, as expectativas para implementação e os critérios de avaliação.


## Objetivo do Projeto
Desenvolver uma aplicação frontend com uma interface intuitiva e responsiva, que permita listar e detalhar informações de Pokémon usando a [PokeAPI](https://pokeapi.co/docs/v2). Ao concluir, a aplicação deverá demonstrar habilidades de integração com API, manipulação de dados e interações de usuário.

[Data Grid MUI / React](https://mui.com/x/react-data-grid/)

[Drawer MUI / React](https://mui.com/material-ui/react-drawer/)


## Estrutura e Requisitos do Projeto

### 1. Listagem de Pokémon
- **Objetivo**: Obter e exibir uma lista de Pokémon através de uma requisição GET na PokeAPI.
- **Detalhes da Implementação**:
  - Utilize a **PokeAPI** para recuperar dados básicos dos Pokémon e exiba-os em uma interface organizada e responsiva, utilizando componentes do React.
  - Cada item da lista de Pokémon deve apresentar:
    - Nome do Pokémon
    - Imagem representativa
  - Cada item deve ser clicável(Via botão Action ou linha), abrindo um Drawer com informações adicionais do Pokémon.

### 2. Drawer com Detalhes do Pokémon
- **Objetivo**: Mostrar informações detalhadas de um Pokémon em um Drawer lateral, permitindo interações adicionais do usuário.
- **Detalhes da Implementação**:
  - Ao clicar em um Pokémon da lista, abra um Drawer (usando o componente react) que exiba informações detalhadas, incluindo:
    - Nome
    - Imagem
    - Habilidades
    - Tipo(s)
    - Altura e peso
    - Experiência base
  - Adicione no Drawer:
    - **Opção de Like/Dislike**: permitindo que o usuário registre sua preferência pelo Pokémon.
    - **Campo de Comentário**: para que o usuário insira uma observação pessoal sobre o Pokémon.

### 3. Envio de Comentário e Preferência
- **Objetivo**: Registrar a interação do usuário (comentário e like/dislike) com o Pokémon selecionado através de uma API mock.
- **Detalhes da Implementação**:
  - Após o preenchimento do campo de comentário e a seleção de like/dislike, envie as informações do Pokémon e do usuário usando a API mock:
    ```bash
    curl --location 'https://6723fb74493fac3cf24cd48c.mockapi.io/api/v1/pokemon' \
    --header 'Content-Type: application/json' \
    --data '{
        "nomePokemon": "nomePokemon",
        "idPokemon": "idPokemon",
        "comentarioPokemon": "comentarioPokemon",
        "likeDislike": true/false,
        "gitHubId": "seuGitHubId", # ID do seu github
    }'
    ```
  - As informações que devem ser enviadas incluem:
    - Nome do Pokémon #Nome do pokémon que recebeu valor
    - ID do Pokémon # id do pokémon dentro da API
    - Comentário do usuário # Valor preenchido pelo usuário
    - Estado de like/dislike (true/false) # valor recebido da interação com usuário
  - Exiba feedback ao usuário informando o sucesso ou a falha da operação POST.

## Tecnologias Requeridas
- **TypeScript**: para tipagem estática e boas práticas de código.
- **MUI** (ou framework frontend de sua escolha): para criação dos componentes e estrutura da interface.
- **React**: para construção de componentes responsivos e visualmente atraentes.
- **PokeAPI**: API pública usada para obter as informações dos Pokémon.
- **API Mock**: fornecida para simular o envio de comentários e interações.

## Guia de Implementação

1. **Clonando o Repositório**
   Clone este repositório em seu ambiente local:
   ```bash
   git clone https://github.com/ContractFlow/TesteDesenvolvedorFront.git

2. **Adicionar breve descrição no codigo em explicacao.md**


## Critérios de Avaliação
- **Integração com API**
    - Integração correta e eficiente com a PokeAPI para obtenção dos dados.
    - Manipulação de respostas da API, incluindo paginação (se necessário) e exibição correta dos dados.
- **Implementação de Componentes**
    - Implementação clara e organizada de componentes usando React.
    - Uso consistente de tipagem TypeScript para garantir robustez e clareza do código.
- **Interface Responsiva e Design**
    - Utilização de React para construir uma interface amigável e responsiva.
    - A listagem e o Drawer devem se adaptar bem a diferentes tamanhos de tela, incluindo dispositivos móveis.
- **Interatividade e Feedback do Usuário**
    - Funcionamento correto das opções de like/dislike e campo de comentário.
    - Feedback visual ao usuário sobre o sucesso ou falha das operações (POST) de comentário e interações.
    - Manutenção de uma experiência de usuário fluida e intuitiva durante as interações.
- **Qualidade do Código**
    - Organização do projeto e clareza na estrutura dos arquivos.
    -C ódigo bem documentado e estruturado em TypeScript, usando boas práticas de programação.

## Entrega do Projeto
- **Opções**
    - Preferencialmente, a entrega do projeto pode ser feita via [StackBlitz](https://stackblitz.com/) para fácil visualização do código e execução do projeto.
    - Como alternativa, você pode realizar um fork deste repositório em seu próprio GitHub e enviar o link do repositório com sua implementação.