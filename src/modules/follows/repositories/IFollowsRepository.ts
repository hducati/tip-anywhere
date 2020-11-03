import ICreateFollowDTO from '../dtos/ICreateFollowDTO';
import Follow from '../infra/typeorm/entities/Follow';

export default interface IFollowsRepository {
  findById(id: string): Promise<Follow | undefined>;
  findFollowedUsers(id: string): Promise<Follow | undefined>;
  findFollowers(id: string): Promise<Follow | undefined>;
  create(data: ICreateFollowDTO): Promise<Follow>;
  save(follow: Follow): Promise<Follow>;
}
