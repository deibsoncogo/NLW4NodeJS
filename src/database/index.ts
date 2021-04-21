import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  // vai extrair as informações dentro do arquivo ormconfig.json
  const defaultOption = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOption, { // vai extrair as informações
      database: process.env.NODE_ENV === "test" // vai verificar qual banco de dados usar
        ? "./src/database/db.test.sqlite" // fake
        : defaultOption.database, // original

      // se estiver executando um teste vai desativar o logging
      // logging: process.env.NODE_ENV !== "test",
    }),
  );
};
