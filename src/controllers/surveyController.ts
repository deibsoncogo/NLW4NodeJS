import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../error/appError";
import { SurveyRepository } from "../repositories/surveyRepository";

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    if (title === "") {
      throw new AppError("Título é obrigatório!", 412);
    }

    if (description === "") {
      throw new AppError("Descrição é obrigatória!", 412);
    }

    const surveyRepository = getCustomRepository(SurveyRepository);

    const surveyExisted = await surveyRepository.findOne({
      description,
    });

    if (surveyExisted) {
      throw new AppError("Já existe cadastrado um pesquisa com esta descrição!", 412);
    }

    const survey = surveyRepository.create({
      title,
      description,
    });

    await surveyRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository);

    const all = await surveyRepository.find();

    return response.status(200).json(all);
  }
}

export { SurveyController };
