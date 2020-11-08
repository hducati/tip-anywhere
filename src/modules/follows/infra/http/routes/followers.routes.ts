import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FollowersController from '../controllers/FollowersController';

const followersRouter = Router();
const followersController = new FollowersController();

followersRouter.use(ensureAuthenticated);
followersRouter.get('/followers', followersController.index);

export default followersRouter;
