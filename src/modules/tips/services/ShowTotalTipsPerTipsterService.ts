import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITipsRepository from '../repositories/ITipsRepository';
import Tip from '../infra/typeorm/entities/Tip';

interface IRequest {
  provider_id: string;
}
@injectable()
export default class ShowTotalTipsPerProvider {
  constructor(
    @inject('TipsRepository')
    private tipsRepository: ITipsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ provider_id }: IRequest): Promise<[Tip[], number]> {
    const user = await this.usersRepository.findById(provider_id);

    if (!user) {
      throw new AppError('Provider user does not exist');
    }

    const [tips, total] = await this.tipsRepository.findByTipster(provider_id);

    return [tips, total];
  }
}
