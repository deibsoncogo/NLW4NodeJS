import express from "express";

const app = express();

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log("SERVER IS RUNNING");
});

app.get("/", (request, response) => {
  response.json({ message: "Hello World - NLW04" });
});

app.post("/", (request, response) => {
  response.json({ message: "Os dados foram salvos com sucesso" });
});

/** MÉTODOS HTTP
* GET === BUSCAR
* POST === SALVAR
* PUT === ALTERAR
* DELETE == EXCLUIR
* PATCH === ALTERAÇÃO ESPECIFICA
* USE === PERMITE EXECUTAR FUTURAMENTE TODOS MÉTODOS
*/
