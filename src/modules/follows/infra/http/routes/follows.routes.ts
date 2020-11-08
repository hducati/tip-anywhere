import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FollowsController from '../controllers/FollowsController';
import FollowingController from '../controllers/FollowingController';
import FollowersController from '../controllers/FollowersController';

const followsRouter = Router();
const followsController = new FollowsController();
const followingController = new FollowingController();
const followersController = new FollowersController();

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

followsRouter.get('/following', followingController.index);
followsRouter.get('/followers', followersController.index);

export default followsRouter;
