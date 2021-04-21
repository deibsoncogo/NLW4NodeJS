import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../error/appError";
import { SurveyUserRepository } from "../repositories/surveyUserRepository";

class AnswerController {
  async execute(request:Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("O usuário da pesquisa não existe!");
    }

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };
