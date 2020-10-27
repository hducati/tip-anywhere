import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITipsRepository from '../repositories/ITipsRepository';
import Tip from '../infra/typeorm/entities/Tip';

interface IRequest {
  id: string;
}

@injectable()
export default class ListSpecificTipService {
  constructor(
    @inject('TipsRepository')
    private tipsRepository: ITipsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Tip> {
    const tip = await this.tipsRepository.findById(id);

    if (!tip) {
      throw new AppError('Tip does not exist.');
    }

    return tip;
  }
}
