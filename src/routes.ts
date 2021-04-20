import { Router } from "express";
import { UserController } from "./controllers/userController";
import { SurveysController } from "./controllers/surveysController";
import { SendMailController } from "./controllers/sendMailController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

router.post("/users", userController.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute);

export { router };
