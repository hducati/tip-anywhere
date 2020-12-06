import ICreateFollowDTO from '../dtos/ICreateFollowDTO';
import Follow from '../infra/typeorm/entities/Follow';

export default interface IFollowsRepository {
  findById(id: string): Promise<Follow | undefined>;
  findFollows(user_id: string): Promise<[Follow[], number]>;
  create(data: ICreateFollowDTO): Promise<Follow>;
  save(follow: Follow): Promise<Follow>;
}
