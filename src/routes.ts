import { Router } from "express";
import { AnswerController } from "./controllers/answerController";
import { NpsController } from "./controllers/npsController";
import { SendMailController } from "./controllers/sendMailController";
import { SurveyController } from "./controllers/surveyController";
import { UserController } from "./controllers/userController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/user", userController.create);
router.get("/user", userController.show);

router.post("/survey", surveyController.create);
router.get("/survey", surveyController.show);

router.post("/sendMail", sendMailController.execute);

router.get("/answer/:value", answerController.execute);

router.get("/nps/:surveyId", npsController.execute);

export { router };
