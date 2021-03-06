import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";
import { validate } from "uuid";
import * as yup from "yup";
import { AppError } from "../error/appError";
import { SurveyRepository } from "../repositories/surveyRepository";
import { SurveyUserRepository } from "../repositories/surveyUserRepository";
import { UserRepository } from "../repositories/userRepository";
import SendMailService from "../services/sendMailService";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, surveyId } = request.body;

    try {
      const schema = yup.object().shape({
        email: yup.string().required("Email é obrigatório!").email("Email inválido!"),
        surveyId: yup.string().required("ID da pesquisa é obrigatório!"),
      });

      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err.errors, 401);
    }

    if (!validate(surveyId)) {
      throw new AppError("ID da pesquisa inválido!", 403);
    }

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await userRepository.findOne({
      email,
    });

    if (!user) {
      throw new AppError("Email não cadastrado!", 403);
    }

    const survey = await surveyRepository.findOne({
      id: surveyId,
    });

    if (!survey) {
      throw new AppError("A pesquisa não existe!", 412);
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
        throw new AppError("O usuário já respondeu esta pesquisa!", 412);
      } else {
        await SendMailService.execute(email, survey.title, informationEmail, npsPath);
        return response.status(205).json(userSurveyExisted);
      }
    }

    const surveyUser = surveyUserRepository.create({
      userId: user.id,
      surveyId,
    });

    informationEmail.userSurveyId = surveyUser.id;

    await surveyUserRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, informationEmail, npsPath);

    return response.status(201).json(surveyUser);
  }
}

export { SendMailController };
