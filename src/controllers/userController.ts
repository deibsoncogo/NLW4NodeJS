import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { AppError } from "../erros/appError";
import { UsersRepository } from "../repositories/usersRepository";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Campo obrigatório!"),
      email: yup.string().email().required("Email inválido!"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError("Usuário já existe!");
    }

    const user = usersRepository.create({
      name, email,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };
