import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import createConnection from "./database";
import { AppError } from "./error/appError";
import { router } from "./routes";

createConnection();

const app = express();

app.use(express.json());
app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "Erro",
    message: `Erro interno do servidor! ${err.message}`,
  });
});

export { app };
