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
  ): Promise<Follow[] | undefined> {
    const follows = await this.ormRepository.find({
      where: {
        followed_user_id,
      },
      relations: ['users'],
    });

    return follows;
  }

  public async findFollowers(
    follower_user_id: string,
  ): Promise<Follow[] | undefined> {
    const follows = await this.ormRepository.find({
      where: {
        follower_user_id,
      },
      relations: ['users'],
    });

    return follows;
  }

  public async create(data: ICreateFollowDTO): Promise<Follow> {
    const follow = this.ormRepository.create(data);

    await this.ormRepository.save(follow);

    return follow;
  }

  public async findUsers(
    followed_user_id: string,
    follower_user_id: string,
  ): Promise<Follow | undefined> {
    const follow = await this.ormRepository.findOne({
      where: {
        follower_user_id,
        followed_user_id,
      },
      relations: ['users'],
    });

    return follow;
  }

  public async save(follow: Follow): Promise<Follow> {
    return this.ormRepository.save(follow);
  }
}
