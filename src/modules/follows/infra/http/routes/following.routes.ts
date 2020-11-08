import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FollowingController from '../controllers/FollowingController';

const followingRouter = Router();
const followingController = new FollowingController();

followingRouter.use(ensureAuthenticated);

followingRouter.get('/following', followingController.index);

export default followingRouter;
