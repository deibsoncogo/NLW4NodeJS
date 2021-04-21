import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";
import { AppError } from "../error/appError";
import { SurveyRepository } from "../repositories/surveyRepository";
import { SurveyUserRepository } from "../repositories/surveyUserRepository";
import { UserRepository } from "../repositories/userRepository";
import SendMailService from "../services/sendMailService";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, surveyId } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await userRepository.findOne({
      email,
    });

    if (!user) {
      throw new AppError("O usuário não existe!");
    }

    const survey = await surveyRepository.findOne({
      id: surveyId,
    });

    if (!survey) {
      throw new AppError("A pesquisa não existe!");
    }

    // vai descobrir o caminho que esta salvo este arquivo
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserAlreadyExist = await surveyUserRepository.findOne({
      where: { userId: user.id, value: null },
      relations: ["user", "survey"],
    });

    const information = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExist) {
      information.id = surveyUserAlreadyExist.id;

      await SendMailService.execute(email, survey.title, information, npsPath);
      return response.json(surveyUserAlreadyExist);
    }

    const surveyUser = surveyUserRepository.create({
      userId: user.id,
      surveyId,
    });

    information.id = surveyUser.id;

    await surveyUserRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { SendMailController };
