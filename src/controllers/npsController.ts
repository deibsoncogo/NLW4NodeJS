import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/surveysUsersRepository";

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({ survey_id, value: Not(IsNull()) });

    const detractor = surveysUsers.filter((i) => i.value >= 0 && i.value <= 6).length;
    const passive = surveysUsers.filter((i) => i.value >= 7 && i.value <= 8).length;
    const promoters = surveysUsers.filter((i) => i.value >= 9 && i.value <= 10).length;
    const totalAnswers = surveysUsers.length;

    const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2));

    return response.json({
      detractor, passive, promoters, totalAnswers, nps: calculate,
    });
  }
}

export { NpsController };
