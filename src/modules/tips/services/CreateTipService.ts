import { injectable, inject } from 'tsyringe';

import ITipsRepository from '../repositories/ITipsRepository';
import Tip from '../infra/typeorm/entities/Tip';

interface IRequest {
  provider_id: string;
  odd: number;
  sport?: string;
  tip: string;
  league?: string;
  game: string;
  unit: number;
  description?: string;
  status?: string;
}

@injectable()
class CreateTipService {
  constructor(
    @inject('TipsRepository')
    private tipsRepository: ITipsRepository,
  ) {}

  public async execute({
    provider_id,
    odd,
    sport,
    tip,
    league,
    game,
    unit,
    description,
    status,
  }: IRequest): Promise<Tip> {
    const tipCreate = await this.tipsRepository.create({
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

    return tipCreate;
  }
}

export default CreateTipService;
