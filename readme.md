# Rocketseat - Next Level Week 4 - Trilha Node JS
Neste curso iremos aprender a utilizar o **Node JS** e **JavaScript** com **TypeScript** para desenvolver um programa com a metodologia de back-end, o projeto será a criação de Net Promoter Score (NPS) que é uma ferramenta utilizada para calcular a lealdade dos clientes de uma loja

>Se o seu objetivo está alinhado com o back-end, e você deseja construir arquiteturas escaláveis e simples para a web utilizando uma linguagem flexível e popular, essa trilha é para você

## Aula 01 - Rumo ao próximo nível
>No primeiro dia vamos aprender os conceitos básicos sobre o que é uma API, entender o que é o NodeJS, onde ele tem sido utilizado e qual problema ele veio solucionar e também, vamos também conhecer o TypeScript e entender como ele irá nos ajudar durante o desenvolvimento da nossa aplicação, já nessa aula vamos dar início ao desenvolvimento da nossa API, colocando em prática alguns dos conceitos aprendidos

Uma `API` (Interface de programação de aplicações) é o conjunto de regras que funciona, é o projeto final de uma aplicação, ela não é uma linguagem de programação ou uma biblioteca

O `Node JS` resolve um grande problema dos `backend` que é a realização de todas requisições de forma sincronizada (`async`, `await`)

No desenvolvimento iremos usar o `TypeScript` pois ele possui a funcionalidade de tipagem (Criação de regra falando quais tipos de dados um parâmetro possui e se ele é obrigatório) que ajuda muito na criação de qualquer aplicação, principalmente no `backend`

Para criar a arquivo principal usaremos o comando abaixo
```bash
yarn init -y
```

Depois de criar o `package.json` vamos começar a instalar algumas dependências
```bash
yarn add express
yarn add @types/express -D
```

O `Express` é um micro framework que vai nos permitir a criar algumas funcionalidades como as rotas, ele é um dos mais utilizados

O JavaScript não entende alguns comandos do TypeScript pois ele é "inferior", com isso precisamos configurar um compilador para o servidor funcionar, para a área de desenvolvimento iremos usar a dependência `ts-node-dev` para executar o servidor sem ter que executar a compilação toda vez
```bash
yarn add typescript -D
yarn tsc --init
yarn add ts-node-dev -D
```

No arquivo `tsconfig.json` vamos definir está configuração como `false`
```ts
"strict": false, /* Ativar todas as opções de verificação de tipo restrita */
```

E no arquivo `package.json` vamos configurar um atalho para executar o servidor
```ts
"scripts": {
  "dev": "ts-node-dev src/server.ts"
}
```

Para executarmos o servidor mais rápido iremos adicionar alguns comandos no atalho acima
```ts
--transpile-only // para desativar a verificação de tipagem pois o Visual já faz isso
--ignore-watch node_modules // para ele ignorar a pasta node_modules pois não devemos mexer nela
```

Adicionando os comandos no atalho ficará assim
```ts
"scripts": {
  "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
}
```

## Aula 02 - Banco de dados
>No segundo dia vamos iniciar a configuração do banco de dados na nossa aplicação, aprendendo algumas formas possíveis para realizar o acesso do banco de dados através do Node JS, vamos entender os conceitos de migrations, models e criar nossa primeira tabela de usuário, também nessa aula iremos aprender e criar nosso primeiro Controller, isolando toda regra para dentro dele

Para configurar o banco de dados vamos usar um `ORM` (Mapeamento objeto-relacional) onde ele vai pegar nossa classe e realizar com mapeamento com o banco de dados, esta funcionalidade vai criar algumas configurações automaticamente, oque iremos usar será o [`TypeORM`](https://typeorm.io/#/)
```bash
yarn add typeorm reflect-metadata
```

Também devemos instalar o drive do banco de dados, hoje iremos usar o `SQLite`
```bash
yarn add sqlite3
```

Para criar nossas tabelas no banco de dados iremos usar as `migrations`, mais o comando utilizado é grande, com isso iremos criar um atalho no `package.json`
```ts
"typeorm": "ts-node-dev node_modules/typeorm/cli.js"
```

É recomendado criar uma configuração para definir onde as migrations devem ser criadas, para isso temos que adicionar estes comando dentro do arquivo `ormconfig.json`
```ts
"migrations": ["./src/database/migrations/**.ts"],
"cli": {
  "migrationsDir": "./src/database/migrations"
}
```

Toda tabela precisa ter uma chave primaria (PK) e podemos ter algumas chaves estrangeira (FK) onde este dados esta salvo em outra tabela e foi trazida para esta tabela


Para criar uma migrations vamos usar o atalho configurado e mais alguns comandos
```bash
yarn typeorm migration:create -n Descrição
```

Para executar as migrations usamos este comando, ele vai executar somente as que estão pendente
```bash
yarn typeorm migration:run
```

Para excluir a execução de uma migration temos este comando que exclui uma por vez
```bash
yarn typeorm migration:revert
```

E para mostra um relatório com o status das migrations temos este comando
```bash
yarn typeorm migration:show
```

Temos a extensão `SQLite` que permite acessar os itens dentro do banco de dados
Um `controller` é um controlador onde todas nossas regras de negocio deve ficar dentro dele

Para consegui receber os dados e salvar no banco de dados precisamos criar as entidades e relacionar com o banco de dados, para isso vamos usar o método de decorator (@), antes temos que ativar estas duas configurações no arquivo `tsconfig.json`
```ts
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

Também temos que informar no arquivo `ormconfig.json` onde as entidades estão salvas
```ts
"entities": ["./src/models/**.ts"],
```

Para criar o id iremos usar a dependência `UUID`
```bash
yarn add uuid
yarn add @types/uuid -D
```

Podemos usar o comandos `readonly` para definir que quem vai definir o dado é o sistema
```ts
readonly id: string;
```

Adicionando este comando no arquivo `ormconfig.json` vai permiti ver os `sql` do banco de dados
```ts
"logging": true,
```

## Aula 03 - Testando a nossa aplicação
>No terceiro dia vamos conhecer o conceito de repository e como podemos utilizar ele para separar as responsabilidades nos componentes corretos, vamos também dar inícios aos testes automatizados e entender os benefícios que eles trazem para a nossa aplicação

No começo da aula criamos os comandos necessários para a parte da pesquisa como uma migration para criar o banco de dados, o modelo com entidade, repositório, controlador e a rota

Existe vários teste automatizados, o teste unitário é utilizado para verificar as classes, o teste de integração verificamos um processo por completo como rota, controller, repository e assim vai, no último tipo de teste temos o ponta a ponta que é quando envolve o frontend

Para criar os testes iremos usar a dependência abaixo
```bash
yarn add jest @types/jest -D
```

O primeiro passo a fazer é responder algumas perguntas para criar sua configuração
```bash
yarn jest --init
```
```
√ Would you like to use Jest when running "test" script in "package.json"? ... yes
√ Would you like to use Typescript for the configuration file? ... yes
√ Choose the test environment that will be used for testing » node
√ Do you want Jest to add coverage reports? ... no
√ Which provider should be used to instrument code for coverage? » v8
√ Automatically clear mock calls and instances between every test? ... yes
```

Também vamos instalar esta dependência para poder utilizar o `TypeScript`
```bash
yarn add ts-jest -D
```

Iremos realizar algumas mudanças no arquivo `jest.config.ts` como pode ver
```ts
bail: true, // faz para a execução dos testes se encontrar algum erro
// testEnvironment: "node", // vamos deixar desabilitado
testMatch: ["**/__tests__/*.test.ts"], // informa onde vai estar salvo os testes
preset: "ts-jest", // para poder usar o TypeScript
```

A estrutura de um teste é bem simples como podemos ver abaixo
```ts
describe("Somatória das informações", () => { // describe define um grupo e sua descrição
  it("A soma deve resultar 4", () => { // it cria um teste com uma descrição
    expect(2 + 2).toBe(4); // expect é oque vai acontecer e toBe define qual deve ser o resultado
  });

  it("A soma não pode resultar 4", () => {
    expect(2 + 2).not.toBe(6); // not define que não pode ser o resultado informado
  });
});
```

O `jest` não lida bem com teste de integração pois este precisa testar tudo como as rotas
Por isso vamos utilizar esta dependência para criar itens fake
```bash
yarn add supertest @types/supertest -D
```

Para conseguir análisar todo fluxo da aplicação vamos ter que criar um banco de dados exclusivo para ele (Não poder ser um fake manual), para o sistema saber quando qual banco de dados executar criamos uma variável ambiente no atalho em `package.json` para assim o arquivo `database/index.ts` selecionar o correto
```ts
"testWindows": "set NODE_ENV=test&&jest",
"testLinus": "NODE_ENV=test jest"
```

Tem como criar uma configuração nos atalhos do `package.json` para executar algo somente depois que outro comando finalizar, para isso precisa criar um novo atalho com o comando desejado e o nome deste atalho precisa iniciar com `post` e terminar com o nome outro atalho
```ts
"testWindows": "set NODE_ENV=test&&jest",
"posttestWindows": "rm ./src/database/db.test.sqlite",
```

## Aula 04 - Envio de email
>No quarto dia vamos aprender como enviar e-mail, utilizando templates customizados com informações vindas do banco de dados, vamos aprender também como utilizar variáveis de ambiente dentro da aplicação

`isNullable` permite que a linha da tabela seja criar com um compo vazio

Para realizar os envios de e-mail temos a biblioteca [`Nodemailer`](https://nodemailer.com/about/)
```bash
yarn add nodemailer
yarn add @types/nodemailer -D
```

Também vamos precisar de um `SMTP` que neste caso será o [`Ethereal`](https://ethereal.email/)

Um `constructor` não permite utilizar o `async await` com isso vamos usar o método antigo onde as informações ficam salvo dentro dele, para isso basta adicionar no final `.then()`

O `constructor` é um método que é executado assim que a classe é chama

Para personalizar nosso e-mail iremos usar a dependência [`Handlebars`](https://handlebarsjs.com/)
```bash
yarn add handlebars
```

## Aula 05 - Finalizando nossa api com validações
>Nessa última aula vamos finalizar o fluxo da nossa aplicação, inserir validações dos dados recebidos e aprender como tratar os possíveis erros

Realizamos a refatoração de alguns itens

Para definir como deve ser os dados a receber iremos usar o `yup`
```bash
yarn add yup
```

Para fazer um teste roda por vez precisamos adicionar o final do comando `-i`
```ts
"testWindows": "set NODE_ENV=test&&jest -i"
```

Para a aplicação conseguir lidar com os erros teremos que usar esta dependência
```bash
yarn add express-async-errors
```
