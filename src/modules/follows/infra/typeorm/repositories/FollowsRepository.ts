import { getRepository, Repository } from 'typeorm';
import ICreateFollowDTO from '@modules/follows/dtos/ICreateFollowDTO';
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

  public async findFollows(user_id: string): Promise<[Follow[], number]> {
    const [follows, countOfFollows] = await this.ormRepository.findAndCount({
      where: {
        user_id,
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
