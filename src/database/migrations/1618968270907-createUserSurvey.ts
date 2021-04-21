import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserSurvey1618968270907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "userSurvey",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "userId",
            type: "uuid",
          },
          {
            name: "surveyId",
            type: "uuid",
          },
          {
            name: "value",
            type: "number",
            isNullable: true, // permite criar a tabela com esta célula vazia
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],

        // criando chave estrangeira
        foreignKeys: [
          {
            name: "FKUser",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["userId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKSurvey",
            referencedTableName: "survey",
            referencedColumnNames: ["id"],
            columnNames: ["surveyId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("userSurvey");
  }
}
