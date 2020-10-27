import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTipService from '@modules/tips/services/CreateTipService';

export default class TipsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const {
      odd,
      sport,
      tip,
      league,
      game,
      unit,
      description,
      status,
    } = request.body;

    const createTip = container.resolve(CreateTipService);

    const tipProvided = await createTip.execute({
      provider_id,
      odd,
      sport,
      tip,
      league,
      game,
      unit,
      description,
      status,
    });

    return response.json(tipProvided);
  }
}
