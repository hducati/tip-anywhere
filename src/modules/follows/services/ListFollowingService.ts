import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IFollowsRepository from '../repositories/IFollowsRepository';
import Follow from '../infra/typeorm/entities/Follow';

interface IRequest {
  followed_user_id: string;
}

@injectable()
export default class ListFollowersService {
  constructor(
    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,
  ) {}

  public async execute({
    followed_user_id,
  }: IRequest): Promise<[Follow[], number]> {
    const [
      follows,
      countFollowing,
    ] = await this.followsRepository.findFollowedUsers(followed_user_id);

    if (!follows) {
      throw new AppError('User does not follow anyone');
    }

    return [follows, countFollowing];
  }
}
