import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFollowsRepository from '../repositories/IFollowsRepository';
import Follow from '../infra/typeorm/entities/Follow';

interface IRequest {
  follower_user_id: string;
}

@injectable()
export default class ListFollowersService {
  constructor(
    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    follower_user_id,
  }: IRequest): Promise<[Follow[], number]> {
    const checkUser = await this.usersRepository.findById(follower_user_id);

    if (!checkUser) {
      throw new AppError('User does not exist');
    }

    const [
      follows,
      countFollowers,
    ] = await this.followsRepository.findFollowers(follower_user_id);

    if (!follows) {
      throw new AppError('User does not have any followers');
    }

    return [follows, countFollowers];
  }
}
