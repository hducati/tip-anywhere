import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FollowsController from '../controllers/FollowsController';

const followsRouter = Router();
const followsController = new FollowsController();

followsRouter.use(ensureAuthenticated);

followsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      followed_user_id: Joi.string().required(),
    },
  }),

  followsController.create,
);

followsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),

  followsController.update,
);

export default followsRouter;
