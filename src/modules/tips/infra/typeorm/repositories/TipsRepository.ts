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

  public async findAllTips({
    except_provider_id,
  }: IFindAllTipsDTO): Promise<Tip[]> {
    let tips: Tip[];

    if (except_provider_id) {
      tips = await this.ormRepository.find({
        where: {
          provider_id: Not(except_provider_id),
        },
      });
    } else {
      tips = await this.ormRepository.find();
    }

    return tips;
  }

  public async create(tipData: ICreateTipDTO): Promise<Tip> {
    const tipCreate = this.ormRepository.create(tipData);

    await this.ormRepository.save(tipCreate);

    return tipCreate;
  }

  public async save(tip: Tip): Promise<Tip> {
    return this.ormRepository.save(tip);
  }

  public async findByTotalTips(provider_id: string): Promise<[Tip[], number]> {
    const totalTips = await this.ormRepository.findAndCount({
      where: {
        provider_id,
      },
    });

    return totalTips;
  }
}

export default TipsRepository;
