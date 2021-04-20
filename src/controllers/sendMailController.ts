import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { AppError } from "../erros/appError";
import { SurveysRepository } from "../repositories/surveysRepository";
import { SurveysUsersRepository } from "../repositories/surveysUsersRepository";
import { UsersRepository } from "../repositories/usersRepository";
import SendMailService from "../services/sendMailService";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new AppError("O usuário não existe!");
    }

    const survey = await surveysRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      throw new AppError("A pesquisa não existe!");
    }

    // vai descobrir o caminho que esta salvo este arquivo
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;

      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    variables.id = surveyUser.id;

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { SendMailController };
