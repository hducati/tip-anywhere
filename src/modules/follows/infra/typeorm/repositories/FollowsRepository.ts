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

  public async findFollowedUsers(
    followed_user_id: string,
  ): Promise<[Follow[], number]> {
    const [follows, countFollowedUsers] = await this.ormRepository.findAndCount(
      {
        where: {
          followed_user_id,
          is_following: true,
        },
        relations: ['users'],
      },
    );

    return [follows, countFollowedUsers];
  }

  public async findFollowers(
    follower_user_id: string,
  ): Promise<[Follow[], number]> {
    const [follows, countFollowers] = await this.ormRepository.findAndCount({
      where: {
        follower_user_id,
        is_following: true,
      },
      relations: ['users'],
    });

    return [follows, countFollowers];
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
