# Rocketseat - Next Level Week 4 - Trilha Node JS
Está é uma aplicação com a metodologia de back-end, onde foi criado um Net Promoter Score (NPS) que é uma ferramenta utilizada para calcular a lealdade dos clientes de uma loja

Para executar esta aplicação basta seguir este comandos
```ts
// para instalar todos as dependências
yarn

// para criar as tabelas do banco de dados do tipo Sqlite
yarn typeorm migration:run

// para executar o servidor
yarn dev

// para executar alguns testes temos estes comandos que deve ser executado conforme seu sistema
yarn testWindows
yarn testLinus
```

## Rotas
A aplicação possui 4 rotas onde elas são as seguintes
```bash
POST: http://localhost:3333/user
GET, POST: http://localhost:3333/survey
POST: http://localhost:3333/sendMail
GET: http://localhost:3333/nps/:ID
```

## Ferramentas e dependências utilizado
As ferramentas utilizadas foram: `Yarn`, `Node JS`, `TypeScript`, `Insomnia` e `BDeaver`

As dependências utilizadas foram: `express`, `express-async-errors`, `handlebars`, `nodemailer`, `reflect-metadata`, `sqlite3`, `typeorm`, `uuid` e `yup`

Dependências usadas em modo de desenvolvimento: `eslint`, `jest`, `supertest`, `ts-jest`, `ts-node-dev` e `typescript`

## Imagens
![Tela para criar um usuário](/src/assets/print1.png)


![Tela para criar uma pesquisa](/src/assets/print2.png)


![Tela para tentar criar uma pesquisa já existente](/src/assets/print3.png)


![Tela para listar todas pesquisas criadas](/src/assets/print4.png)


![Tela para vincular um usuário com uma pesquisa e enviar um email fake](/src/assets/print5.png)


![Tela para acessar o email fake](/src/assets/print6.png)


![Tela para responder a pesquisa](/src/assets/print7.png)


![Tela para gerar o NPS da pesquisa informada](/src/assets/print8.png)
