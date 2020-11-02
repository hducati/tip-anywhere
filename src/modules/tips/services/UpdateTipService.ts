import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITipsRepository from '../repositories/ITipsRepository';
import Tip from '../infra/typeorm/entities/Tip';

interface IRequest {
  provider_id: string;
  id: string;
  status: string;
}

@injectable()
export default class UpdateTipService {
  constructor(
    @inject('TipsRepository')
    private tipsRepository: ITipsRepository,
  ) {}

  public async execute({ provider_id, id, status }: IRequest): Promise<Tip> {
    const tip = await this.tipsRepository.findById(id);

    if (!tip) {
      throw new AppError('Tip does not exist');
    }

    if (tip.provider_id !== provider_id) {
      throw new AppError('User tried to update a tip not created by him');
    }

    tip.status = status;

    return this.tipsRepository.save(tip);
  }
}
