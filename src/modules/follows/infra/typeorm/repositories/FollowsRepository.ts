import { getRepository, Repository } from 'typeorm';
import ICreateFollowDTO from '@modules/follows/dtos/ICreateFollowDTO';
import IFollowFilterDTO from '@modules/follows/dtos/IFollowFilterDTO';
import IFollowsRepository from '@modules/follows/repositories/IFollowsRepository';
import Follow from '../entities/Follow';

export default class FollowsRepository implements IFollowsRepository {
  private ormRepository: Repository<Follow>;

  constructor() {
    this.ormRepository = getRepository(Follow);
  }

  public async findById(id: string): Promise<Follow | undefined> {
    const follow = await this.ormRepository.findOne(id);

    return follow;
  }

  public async findFollows(
    follow_filter_data: IFollowFilterDTO,
  ): Promise<[Follow[], number]> {
    const [follows, countOfFollows] = await this.ormRepository.findAndCount({
      where: {
        follow_filter_data,
        is_following: true,
      },
      relations: ['users'],
    });

    return [follows, countOfFollows];
  }

  public async create(data: ICreateFollowDTO): Promise<Follow> {
    const follow = this.ormRepository.create(data);

    await this.ormRepository.save(follow);

    return follow;
  }

  public async save(follow: Follow): Promise<Follow> {
    return this.ormRepository.save(follow);
  }
}
