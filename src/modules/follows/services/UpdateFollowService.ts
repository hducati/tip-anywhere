import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IFollowsRepository from '../repositories/IFollowsRepository';
import Follow from '../infra/typeorm/entities/Follow';

interface IRequest {
  id: string;
  follower_user_id: string;
}

@injectable()
export default class UpdateFollowService {
  constructor(
    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,
  ) {}

  public async execute({ id, follower_user_id }: IRequest): Promise<Follow> {
    const follow = await this.followsRepository.findById(id);

    if (!follow) {
      throw new AppError('Follow provided does not exist');
    }

    if (follow.follower_user_id !== follower_user_id) {
      throw new AppError(
        'Follower tried to update a follow not created by himself',
      );
    }

    follow.is_following = follow.is_following !== true;

    return this.followsRepository.save(follow);
  }
}
