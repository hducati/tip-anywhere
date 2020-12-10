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
  }: IRequest): Promise<[Tip[], number]> {
    const [tips, countOfTips] = await this.tipsRepository.findByFilter({
      status,
      league,
      sport,
    });

    if (countOfTips === 0) {
      throw new AppError('Filter provided does not exist.');
    }

    return [tips, countOfTips];
  }
}

export default ListTipsByFilterService;
