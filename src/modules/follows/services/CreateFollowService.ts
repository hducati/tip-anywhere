import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Follow from '../infra/typeorm/entities/Follow';
import IFollowsRepository from '../repositories/IFollowsRepository';

interface IRequest {
  followed_user_id: string;
  follower_user_id: string;
}

@injectable()
export default class CreateFollowService {
  constructor(
    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,

    @inject('UsersRepositry')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    followed_user_id,
    follower_user_id,
  }: IRequest): Promise<Follow> {
    const findFollowedUser = await this.usersRepository.findById(
      followed_user_id,
    );

    if (!findFollowedUser) {
      throw new AppError('Followed user does not exist');
    }

    const findFollowerUser = await this.usersRepository.findById(
      follower_user_id,
    );

    if (!findFollowerUser) {
      throw new AppError('Follower user does not exist');
    }

    const follow = this.followsRepository.create({
      followed_user_id,
      follower_user_id,
    });

    return follow;
  }
}
