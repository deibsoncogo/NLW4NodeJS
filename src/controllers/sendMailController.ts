import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";
import * as yup from "yup";
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
      throw new AppError("Email não cadastrado!");
    }

    const survey = await surveyRepository.findOne({
      id: surveyId,
    });

    if (!survey) {
      throw new AppError("A pesquisa não existe!");
    }

    // vai descobrir o caminho que esta salvo este arquivo
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const userSurveyExisted = await surveyUserRepository.findOne({
      where: { userId: user.id, surveyId },
      relations: ["user", "survey"],
    });

    const informationEmail = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      userSurveyId: userSurveyExisted ? userSurveyExisted.id : "",
      link: process.env.URL_MAIL,
    };

    if (userSurveyExisted) {
      if (userSurveyExisted.value) {
        throw new AppError("O usuário já respondeu esta pesquisa!");
      } else {
        await SendMailService.execute(email, survey.title, informationEmail, npsPath);
        return response.json(userSurveyExisted);
      }
    }

    const surveyUser = surveyUserRepository.create({
      userId: user.id,
      surveyId,
    });

    informationEmail.userSurveyId = surveyUser.id;

    await surveyUserRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, informationEmail, npsPath);

    return response.json(surveyUser);
  }
}

export { SendMailController };
