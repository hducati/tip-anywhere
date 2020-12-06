import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFollowsRepository from '../repositories/IFollowsRepository';
import Follow from '../infra/typeorm/entities/Follow';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListFollowsPerUserService {
  constructor(
    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<[Follow[], number]> {
    const checkUser = await this.usersRepository.findById(user_id);

    if (!checkUser) {
      throw new AppError('User does not exist');
    }

    const [follows, countOfFollows] = await this.followsRepository.findFollows(
      user_id,
    );

    return [follows, countOfFollows];
  }
}
