import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { AppError } from "../error/appError";
import { UserRepository } from "../repositories/userRepository";

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

    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExist = await userRepository.findOne({
      email,
    });

    if (userAlreadyExist) {
      throw new AppError("Usuário já existe!");
    }

    const user = userRepository.create({
      name, email,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };
