import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import tipsRouter from '@modules/tips/infra/http/routes/tips.routes';
import followsRouter from '@modules/follows/infra/http/routes/follows.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/tips', tipsRouter);
routes.use('/follows', followsRouter);

export default routes;
