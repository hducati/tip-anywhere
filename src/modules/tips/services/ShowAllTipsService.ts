import { injectable, inject } from 'tsyringe';
import ITipsRepository from '../repositories/ITipsRepository';
import Tip from '../infra/typeorm/entities/Tip';

interface IRequest {
  provider_id?: string;
}
@injectable()
export default class ShowAllTips {
  constructor(
    @inject('TipsRepository')
    private tipsRepository: ITipsRepository,
  ) {}

  public async execute({ provider_id }: IRequest): Promise<[Tip[], number]> {
    const [tips, countOfTips] = await this.tipsRepository.findAllTips({
      except_provider_id: provider_id,
    });

    return [tips, countOfTips];
  }
}
