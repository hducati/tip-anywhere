import ICreateFollowDTO from '../dtos/ICreateFollowDTO';
import IFollowFilterDTO from '../dtos/IFollowFilterDTO';
import Follow from '../infra/typeorm/entities/Follow';

export default interface IFollowsRepository {
  findById(id: string): Promise<Follow | undefined>;
  findFollows(
    follow_filter_data: IFollowFilterDTO,
  ): Promise<[Follow[], number]>;
  create(data: ICreateFollowDTO): Promise<Follow>;
  save(follow: Follow): Promise<Follow>;
}
