import { getConnection } from "typeorm";
import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Survey", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/survey").send({
      title: "Title Example",
      description: "Description Example",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all survey", async () => {
    await request(app).post("/survey").send({
      title: "Title Example",
      description: "Description Example",
    });

    const response = await request(app).get("/survey");

    expect(response.body.length).toBe(2);
  });
});
