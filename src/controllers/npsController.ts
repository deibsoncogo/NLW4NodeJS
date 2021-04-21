import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { validate } from "uuid";
import { AppError } from "../error/appError";
import { SurveyUserRepository } from "../repositories/surveyUserRepository";

class NpsController {
  async execute(request: Request, response: Response) {
    const { surveyId } = request.params;

    if (!validate(surveyId)) {
      throw new AppError("ID da pesquisa inválido!");
    }

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.find({ surveyId, value: Not(IsNull()) });

    const detractor = surveyUser.filter((i) => i.value >= 0 && i.value <= 6).length;
    const passive = surveyUser.filter((i) => i.value >= 7 && i.value <= 8).length;
    const promoter = surveyUser.filter((i) => i.value >= 9 && i.value <= 10).length;
    const totalAnswer = surveyUser.length;

    const calculate = Number((((promoter - detractor) / totalAnswer) * 100).toFixed(2));

    return response.json({
      detractor, passive, promoter, totalAnswer, nps: calculate,
    });
  }
}

export { NpsController };
