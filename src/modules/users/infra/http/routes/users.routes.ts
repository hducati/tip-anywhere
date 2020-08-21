import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      birthday_date: Joi.date().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      description: Joi.string(),
      phone_number: Joi.string().length(13),
      telegram: Joi.string(),
      whatsapp: Joi.string(),
      facebook: Joi.string(),
    },
  }),

  usersController.create,
);

export default usersRouter;
