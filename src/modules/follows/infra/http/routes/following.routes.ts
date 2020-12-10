import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import FollowingController from '../controllers/FollowingController';

const followingRouter = Router();
const followingController = new FollowingController();

followingRouter.use(ensureAuthenticated);

followingRouter.get(
  '/:user_id/following',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  followingController.index,
);

followingRouter.get('/following', followingController.index);

export default followingRouter;
