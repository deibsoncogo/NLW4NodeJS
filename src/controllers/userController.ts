import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { AppError } from "../error/appError";
import { UserRepository } from "../repositories/userRepository";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    try {
      const schema = yup.object().shape({
        name: yup.string().required("Nome é obrigatório!"),
        email: yup.string().required("Email é obrigatório!").email("Email inválido!"),
      });

      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err.errors, 401);
    }

    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExist = await userRepository.findOne({
      email,
    });

    if (userAlreadyExist) {
      throw new AppError("Email já cadastrado!", 412);
    }

    const user = userRepository.create({
      name, email,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }

  async show(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const all = await userRepository.find();

    return response.status(200).json(all);
  }
}

export { UserController };
