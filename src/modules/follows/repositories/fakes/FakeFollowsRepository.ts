import { uuid } from 'uuidv4';
import Follow from '../../infra/typeorm/entities/Follow';
import ICreateFollowDTO from '../../dtos/ICreateFollowDTO';
import IFollowsRepository from '../IFollowsRepository';

export default class FakeFollowsRepository implements IFollowsRepository {
  private follows: Follow[] = [];

  public async findById(id: string): Promise<Follow | undefined> {
    const findFollow = this.follows.find(follow => follow.id === id);

    return findFollow;
  }

  public async findFollowers(
    follower_user_id: string,
  ): Promise<[Follow[], number]> {
    const findFollowers = this.follows.filter(
      follow =>
        follow.follower_user_id === follower_user_id &&
        follow.is_following === true,
    );
    const countOfFollowers = findFollowers.length;

    return [findFollowers, countOfFollowers];
  }

  public async findFollowedUsers(
    followed_user_id: string,
  ): Promise<[Follow[], number]> {
    const findFollowedUsers = this.follows.filter(
      follow =>
        follow.followed_user_id === followed_user_id &&
        follow.is_following === true,
    );

    const countOfFollowedUsers = findFollowedUsers.length;

    return [findFollowedUsers, countOfFollowedUsers];
  }

  public async create(data: ICreateFollowDTO): Promise<Follow> {
    const followCreate = new Follow();

    Object.assign(followCreate, { id: uuid() }, data);

    this.follows.push(followCreate);

    return followCreate;
  }

  public async save(follow: Follow): Promise<Follow> {
    const findIndex = this.follows.findIndex(
      findFollow => findFollow.id === follow.id,
    );

    this.follows[findIndex] = follow;

    return follow;
  }
}
