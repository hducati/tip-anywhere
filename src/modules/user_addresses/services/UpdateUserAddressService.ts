import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserAddressesRepository from '../repositories/IUserAddressesRepository';
import UserAddress from '../infra/typeorm/entities/UserAddress';

interface IRequest {
  id: string;
  user_id: string;
  country: string;
  zip_code: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
}

@injectable()
class UpdateUserAddressService {
  constructor(
    @inject('UserAddressesRepository')
    private userAddressesRepository: IUserAddressesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
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
    const userAddress = await this.userAddressAvailability(id);

    userAddress.country = country;
    userAddress.zip_code = zip_code;
    userAddress.state = state;
    userAddress.city = city;
    userAddress.neighborhood = neighborhood;
    userAddress.street = street;
    userAddress.number = number;
    userAddress.complement = complement;

    return this.userAddressesRepository.save(userAddress);
  }

  private async userAvailability(user_id: string) {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User does not exist');
    }

    return findUser;
  }

  private async userAddressAvailability(id: string) {
    const findUserAddress = await this.userAddressesRepository.findById(id);

    if (!findUserAddress) {
      throw new AppError('Address does not exist');
    }

    return findUserAddress;
  }
}

export default UpdateUserAddressService;
