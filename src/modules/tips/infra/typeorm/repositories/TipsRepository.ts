import { getRepository, Not, Repository } from 'typeorm';
import ICreateTipDTO from '@modules/tips/dtos/ICreateTipDTO';
import ITipsRepository from '@modules/tips/repositories/ITipsRepository';
import ISearchFilterDTO from '@modules/tips/dtos/ISearchFilterDTO';
import IFindAllTipsDTO from '@modules/tips/dtos/IFindAllTipsDTO';

import Tip from '../entities/Tip';

class TipsRepository implements ITipsRepository {
  private ormRepository: Repository<Tip>;

  constructor() {
    this.ormRepository = getRepository(Tip);
  }

  public async findById(id: string): Promise<Tip | undefined> {
    const tip = await this.ormRepository.findOne(id);

    return tip;
  }

  public async findByUser(provider_id: string): Promise<Tip[] | undefined> {
    const tips = await this.ormRepository.find({
      where: {
        provider_id,
      },
      relations: ['users'],
    });

    return tips;
  }

  public async findByFilter(
    filter: ISearchFilterDTO,
  ): Promise<Tip[] | undefined> {
    const tips = await this.ormRepository.find({
      where: {
        filter,
      },
    });

    return tips;
  }

  public async findByTotalTips(provider_id: string): Promise<[Tip[], number]> {
    const [tips, total] = await this.ormRepository.findAndCount({
      where: {
        provider_id,
      },
    });

    return [tips, total];
  }

  public async findAllTips({
    except_provider_id,
  }: IFindAllTipsDTO): Promise<[Tip[], number]> {
    let tips: Tip[];
    let countOfTips: number;

    if (except_provider_id) {
      [tips, countOfTips] = await this.ormRepository.findAndCount({
        where: {
          provider_id: Not(except_provider_id),
        },
      });
    } else {
      [tips, countOfTips] = await this.ormRepository.findAndCount();
    }

    return [tips, countOfTips];
  }

  public async create(tipData: ICreateTipDTO): Promise<Tip> {
    const tipCreate = this.ormRepository.create(tipData);

    await this.ormRepository.save(tipCreate);

    return tipCreate;
  }

  public async save(tip: Tip): Promise<Tip> {
    return this.ormRepository.save(tip);
  }
}

export default TipsRepository;
