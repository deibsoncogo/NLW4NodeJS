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
