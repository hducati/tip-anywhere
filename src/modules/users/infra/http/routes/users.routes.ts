import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import ListUsersController from '../controllers/ListUsersController';

const usersRouter = Router();
const usersController = new UsersController();
const usersListController = new ListUsersController();

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

usersRouter.get('/list', ensureAuthenticated, usersListController.index);

export default usersRouter;
