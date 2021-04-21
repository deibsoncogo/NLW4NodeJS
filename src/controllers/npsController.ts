import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { validate } from "uuid";
import { AppError } from "../error/appError";
import { SurveyRepository } from "../repositories/surveyRepository";
import { SurveyUserRepository } from "../repositories/surveyUserRepository";

class NpsController {
  async execute(request: Request, response: Response) {
    const { surveyId } = request.params;

    if (!validate(surveyId)) {
      throw new AppError("ID da pesquisa inválido!", 403);
    }

    const surveyRepository = getCustomRepository(SurveyRepository);

    const survey = await surveyRepository.findOne({ id: surveyId });

    if (!survey) {
      throw new AppError("Está pesquisa não existe!", 403);
    }

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.find({ surveyId });

    if (!surveyUser[0]) {
      throw new AppError("Não existe nenhum usuário relacionado com esta pesquisa!", 403);
    }

    const totalSurveyAnswered = surveyUser.filter((i) => i.value !== null).length;

    if (totalSurveyAnswered === 0) {
      throw new AppError("Nenhum usuário respondeu a pesquisa!", 403);
    }

    const detractor = surveyUser.filter((i) => i.value >= 0 && i.value <= 6).length;
    const passive = surveyUser.filter((i) => i.value >= 7 && i.value <= 8).length;
    const promoter = surveyUser.filter((i) => i.value >= 9 && i.value <= 10).length;
    const totalSurvey = surveyUser.length;

    const calculate = Number((((promoter - detractor) / totalSurveyAnswered) * 100).toFixed(2));

    return response.status(201).json({
      detractor, passive, promoter, totalSurveyAnswered, totalSurvey, nps: calculate,
    });
  }
}

export { NpsController };
