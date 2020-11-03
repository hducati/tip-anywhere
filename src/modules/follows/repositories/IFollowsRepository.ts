import ICreateFollowDTO from '../dtos/ICreateFollowDTO';
import Follow from '../infra/typeorm/entities/Follow';

export default interface IFollowsRepository {
  findById(id: string): Promise<Follow | undefined>;
  findFollowedUsers(followed_user_id: string): Promise<Follow | undefined>;
  findFollowers(follower_user_id: string): Promise<Follow | undefined>;
  unfollow(id: string): Promise<Follow | undefined>;
  follow(id: string): Promise<Follow | undefined>;
  create(data: ICreateFollowDTO): Promise<Follow>;
  save(follow: Follow): Promise<Follow>;
}
