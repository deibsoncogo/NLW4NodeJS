import { app } from "./app";

// removendo os demais comandos vamos conseguir executar os testes sem rodar o servidor
app.listen(3333, () => {
  console.log("SERVER IS RUNNING");
});

/** MÉTODOS HTTP
* GET === BUSCAR
* POST === SALVAR
* PUT === ALTERAR
* DELETE == EXCLUIR
* PATCH === ALTERAÇÃO ESPECIFICA
* USE === PERMITE EXECUTAR FUTURAMENTE TODOS MÉTODOS
*/
