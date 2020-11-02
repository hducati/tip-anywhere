import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TipsController from '../controllers/TipsController';

const tipsRouter = Router();
const tipsController = new TipsController();

tipsRouter.use(ensureAuthenticated);

tipsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      odd: Joi.number().required(),
      tip: Joi.string().required(),
      sport: Joi.string(),
      league: Joi.string(),
      game: Joi.string().required(),
      unit: Joi.number().required(),
      description: Joi.string(),
      status: Joi.string(),
    },
  }),

  tipsController.create,
);

tipsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  tipsController.show,
);

export default tipsRouter;
