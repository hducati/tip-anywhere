import { getRepository, Repository } from 'typeorm';
import ICreateTipDTO from '@modules/tips/dtos/ICreateTipDTO';
import ITipsRepository from '@modules/tips/repositories/ITipsRepository';

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
      relations: ['user'],
    });

    return tips;
  }

  public async findBySport(sport: string): Promise<Tip[] | undefined> {
    const tips = await this.ormRepository.find({
      where: {
        sport,
      },
    });

    return tips;
  }

  public async findByStatus(status: string): Promise<Tip[] | undefined> {
    const tips = await this.ormRepository.find({
      where: {
        status,
      },
    });

    return tips;
  }

  public async findAllTips(): Promise<Tip[]> {
    const tips = await this.ormRepository.find({
      relations: ['user'],
    });

    return tips;
  }

  public async findByLeague(league: string): Promise<Tip[] | undefined> {
    const tips = await this.ormRepository.find({
      where: {
        league,
      },
    });

    return tips;
  }

  public async create({
    provider_id,
    odd,
    sport,
    tip,
    league,
    game,
    unit,
    description,
    status,
  }: ICreateTipDTO): Promise<Tip> {
    const tipCreate = this.ormRepository.create({
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

    await this.ormRepository.save(tipCreate);

    return tipCreate;
  }
}

export default TipsRepository;