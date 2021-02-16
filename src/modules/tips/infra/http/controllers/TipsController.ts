import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTipService from '@modules/tips/services/CreateTipService';
import ShowTipService from '@modules/tips/services/ShowTipService';
import UpdateTipStatusService from '@modules/tips/services/UpdateTipStatusService';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listTip = container.resolve(ShowTipService);

    const tip = await listTip.execute({ id });

    return response.json(tip);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const { id } = request.params;

    const { status } = request.body;

    const updateTip = container.resolve(UpdateTipStatusService);

    const tip = await updateTip.execute({ provider_id, id, status });

    return response.json(tip);
  }
}
