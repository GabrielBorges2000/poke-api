# EXPLICACAO.md - Visão Geral do Desenvolvimento

## Resumo do Projeto
Este arquivo destina-se a fornecer uma visão geral do desenvolvimento deste teste, incluindo os principais desafios e soluções adotadas.

### Desafios Encontrados
Por favor, descreva os principais desafios que você encontrou ao desenvolver este projeto. Algumas áreas a serem cobertas:

1. **Integração com a PokeAPI**:
   - Houve alguma dificuldade na obtenção e manipulação dos dados da PokeAPI?
      Somente na parte de atualizar o comentário existente.
   - Como você lidou com a paginação (se aplicável) e exibição dos dados?
      Quando o usuário vai na lista eu pego os dados e gero um cache e reutilizo gerando a páginação com todos os dados.

2. **Implementação do Drawer**:
   - Quais foram os desafios em exibir os dados detalhados no Drawer?
      Basicamente para realizar a request e pegar os dados foram simples. Porém a parte de pegar o comentário e o lik atual foram as mais dificeis. depois que ue entendi como a mockApi funcionava eu consgeui realizar.
   - Como foi a experiência de adicionar as opções de like/dislike e o campo de comentário?
      A principio parecia algo dificil, mas ai quando implementei um "Mini sistema de login" simples sem válidação do usuário só para saber quem foi que curtiu e comentou ficou mais simples.

3. **Envio de Comentários e Preferências**:
   - Houve alguma complexidade na configuração e envio da requisição POST para a API mock?
      No post não, mas no put sim
   - Como você lidou com a exibição de feedback (sucesso/falha) ao usuário?
      utilizei a biblioteca toast para exibir alertas na tela. Além, de desabilitar o botão no loading e reabilitar quando estivesse pronto.

4. **Uso de TypeScript e MUI**:
   - Como você organizou o código em TypeScript para garantir uma tipagem eficiente e clara?
      criei uma pasta types e separei e reutilizei as mesma typagens
   - Houve alguma dificuldade no uso do Material Design (MUI) para tornar o design responsivo?
      Sim, na parte da tabela pois eu não estava conseguindo colocar tamanhos nas colunas, mas ai eu lê na doxumentaçõa que era possivel colocar um flex, width e minWidth para personalizar e deu certo, como fazia tempo que eu não utiliza essa lib eu havia esquecido como funcionava. Ai no final deu tudo certo.

### Soluções e Melhorias
- Descreva as soluções que você implementou para contornar os desafios.
- Comente sobre possíveis melhorias ou funcionalidades adicionais que poderiam ser adicionadas ao projeto.

Eu criei uma tabela onde lista um catálogo de pokemons, ai todos os usuários poderia ver essa lista e os detalhes, porém só poderia interagir quem tivesse autorização, ai usutilizei algo que seria parecido com um login pegando apenas o nome do usuário e pegando os dados dele na api do github, após isso eu salvei os dados do usuário no localstorage e depois utilizei a contextApi do react para criar hooks personalizados para manipular se o usuário estava logado ou não. A única validação foi saber se existia um usuário no github.

Após isso o usuário poderia ver os pokemons e interagir, sendo assim possivel ver as interações anteriores.

Para melhorias futuras recomendo criar uma coluna com a quantidade de likes que o pokemon tem ou até memso criar uma nova página para o usuário ver os pokemons que ele mais gostou. Além disso poderia ser utilizado a estrategia colocar os pokemons em cards, gerando uma lista de cards e realizar o carregamento parcial e a páginação, ou até mesmo ir carregando os dados parcialmente ao invéz de trazer todos eles e salvar em cache para poder realizar a páginação.

---

Obrigado por suas respostas detalhadas! Sua visão e explicações nos ajudam a entender melhor seu processo de pensamento e habilidades de resolução de problemas.