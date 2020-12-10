import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import FollowersController from '../controllers/FollowersController';

const followersRouter = Router();
const followersController = new FollowersController();

followersRouter.use(ensureAuthenticated);

followersRouter.get(
  '/:user_id/followers',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  followersController.index,
);

followersRouter.get('/followers', followersController.index);

export default followersRouter;
