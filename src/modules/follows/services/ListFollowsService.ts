import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFollowsRepository from '../repositories/IFollowsRepository';
import Follow from '../infra/typeorm/entities/Follow';

interface IRequest {
  followed_user_id: string;
}

@injectable()
export default class ListFollowsService {
  constructor(
    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    followed_user_id,
  }: IRequest): Promise<[Follow[], number]> {
    const checkUser = await this.usersRepository.findById(followed_user_id);

    if (!checkUser) {
      throw new AppError('User does not exist');
    }

    const [
      follows,
      countOfFollows,
    ] = await this.followsRepository.findFollowedUsers(followed_user_id);

    return [follows, countOfFollows];
  }
}
