# EXPLICACAO.md - Visão Geral do Desenvolvimento

## Resumo do Projeto
Este documento oferece uma visão geral do desenvolvimento do projeto de integração com a PokeAPI. Abaixo estão os principais desafios enfrentados e as soluções implementadas para superá-los.

### Desafios Encontrados

#### 1. **Integração com a PokeAPI**
   - **Dificuldade na manipulação de dados:** A principal complexidade surgiu ao atualizar comentários existentes, enquanto a obtenção e manipulação dos dados em geral foi tranquila.
   - **Paginação e exibição de dados:** A estratégia adotada foi carregar todos os dados de uma vez, armazená-los em cache e realizar a paginação localmente. Isso permitiu que os dados fossem reutilizados em vez de fazer novas requisições, otimizando a experiência do usuário.

#### 2. **Implementação do Drawer para Dados Detalhados**
   - **Exibição de dados detalhados:** A requisição para exibir dados detalhados foi direta, mas recuperar comentários e preferências de “like” existentes exigiu mais ajustes.
   - **Like/Dislike e comentários:** No início, a adição dessas funcionalidades parecia complexa. No entanto, após a implementação de um "Mini Sistema de Login" sem autenticação avançada, onde apenas o nome do usuário era capturado, a lógica simplificou. A integração com a API do GitHub validava se o usuário existia, e os dados foram armazenados no `localStorage`. Em seguida, a `Context API` do React gerenciou o estado de autenticação e personalizou as interações.

#### 3. **Envio de Comentários e Preferências**
   - **Configuração de requisições POST e PUT:** A configuração das requisições POST foi direta. Contudo, houve maior dificuldade com as requisições PUT ao atualizar comentários.
   - **Feedback ao usuário:** Utilizei a biblioteca `toast` para notificar o usuário sobre o sucesso ou falha das ações. Além disso, desabilitei o botão durante o carregamento e reabilitei-o após o término da requisição.

#### 4. **Uso de TypeScript e MUI (Material UI)**
   - **Tipagem e organização:** Para garantir uma tipagem eficiente e clara, criei uma pasta `types` onde as tipagens foram separadas e reutilizadas ao longo do projeto.
   - **Design responsivo:** Um dos desafios com o MUI foi ajustar as colunas da tabela. Após consultar a documentação, utilizei propriedades como `flex`, `width` e `minWidth`, o que solucionou a questão. O MUI não era uma biblioteca com que eu estava familiarizado recentemente, mas o projeto foi ajustado com sucesso após a leitura.

### Soluções e Melhorias

#### Soluções Implementadas
- **Autenticação e Permissões:** Criei uma tabela para exibir o catálogo de Pokémons, disponível a todos os usuários. Para permitir interações, foi implementado um sistema de "login" simplificado, com verificação do nome de usuário via API do GitHub. Os dados foram armazenados em `localStorage`, e a `Context API` do React gerenciou o estado de autenticação, permitindo que os usuários interagissem apenas se autenticados.
- **Cache e Paginação:** A estratégia de carregar todos os dados de uma vez e armazená-los em cache permitiu paginação rápida e eficiente sem recarregamento constante dos dados.
- **Feedback Visual:** Notificações de sucesso e falha foram exibidas com `toast`, aprimorando a experiência do usuário com feedbacks em tempo real.

#### Melhorias Futuras
- **Contador de Likes:** Adicionar uma coluna que exiba a contagem total de "likes" por Pokémon ou criar uma nova página onde o usuário possa ver seus Pokémons favoritos.
- **Exibição com Cards:** Utilizar uma interface de cards para exibir os Pokémons, implementando carregamento incremental e paginação, ou carregar dados parcialmente em vez de carregar todos de uma vez e armazenar em cache.
- **Biblioteca de Componentes Alternativa:** Utilizar uma biblioteca mais flexível, como `shadcn/ui`, no lugar do Material UI. Essa biblioteca permite maior personalização e cópia de código-fonte direto no projeto, otimizando as dependências e melhorando a performance.


### Observação

Ao utilizar o **StackBlitz** como ambiente de desenvolvimento, é possível que algumas imagens estáticas na página inicial não carreguem devido às limitações da plataforma. Testes em ambientes locais e de produção foram bem-sucedidos, confirmando que essa é uma limitação do StackBlitz e não um erro de desenvolvimento.

---

Agradecemos por suas respostas detalhadas! Suas explicações ajudam a entender melhor seu processo de raciocínio e habilidades na resolução de problemas.
