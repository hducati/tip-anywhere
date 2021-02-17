import { injectable, inject } from 'tsyringe';
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
}

export default CreateUserAddresService;
