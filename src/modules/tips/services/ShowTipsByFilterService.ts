import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITipsRepository from '../repositories/ITipsRepository';

import Tip from '../infra/typeorm/entities/Tip';

interface IRequest {
  status?: string;
  league?: string;
  sport?: string;
}

@injectable()
class ListTipsByFilterService {
  constructor(
    @inject('TipsRepository')
    private tipsRepository: ITipsRepository,
  ) {}

  public async execute({
    status,
    league,
    sport,
  }: IRequest): Promise<Tip[] | undefined> {
    const tips = await this.tipsRepository.findByFilter({
      status,
      league,
      sport,
    });

    if (!tips) {
      throw new AppError('Search tip does not exist.');
    }

    return tips;
  }
}

export default ListTipsByFilterService;
