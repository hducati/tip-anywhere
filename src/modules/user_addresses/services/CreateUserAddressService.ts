import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUserAddressesRepository from '../repositories/IUserAddressesRepository';
import UserAddress from '../infra/typeorm/entities/UserAddress';

interface IRequest {
  user_id: string;
  country?: string;
  zip_code?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  complement?: string;
}

@injectable()
class CreateUserAddresService {
  constructor(
    @inject('UserAddressesRepository')
    private userAddressesRepository: IUserAddressesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    country,
    zip_code,
    state,
    city,
    neighborhood,
    street,
    number,
    complement,
  }: IRequest): Promise<UserAddress> {
    await this.userAvailability(user_id);
    const addressCreator = await this.userAddressesRepository.create({
      user_id,
      country,
      zip_code,
      state,
      city,
      neighborhood,
      street,
      number,
      complement,
    });

    return addressCreator;
  }

  private async userAvailability(user_id: string) {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User does not exist');
    }

    return findUser;
  }
}

export default CreateUserAddresService;
