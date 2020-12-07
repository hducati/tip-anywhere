import { uuid } from 'uuidv4';
import Follow from '../../infra/typeorm/entities/Follow';
import ICreateFollowDTO from '../../dtos/ICreateFollowDTO';
import IFollowFilterDTO from '../../dtos/IFollowFilterDTO';
import IFollowsRepository from '../IFollowsRepository';

export default class FakeFollowsRepository implements IFollowsRepository {
  private follows: Follow[] = [];

  public async findById(id: string): Promise<Follow | undefined> {
    const findFollow = this.follows.find(follow => follow.id === id);

    return findFollow;
  }

  public async findFollows(
    follow_filter_data: IFollowFilterDTO,
  ): Promise<[Follow[], number]> {
    let { follows } = this;

    if (follow_filter_data.followed_user_id) {
      follows = this.follows.filter(
        follow =>
          follow.followed_user_id === follow_filter_data.followed_user_id &&
          follow.is_following === true,
      );
    } else {
      follows = this.follows.filter(
        follow =>
          follow.follower_user_id === follow_filter_data.follower_user_id &&
          follow.is_following === true,
      );
    }

    const countOfFollows = follows.length;

    return [follows, countOfFollows];
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
