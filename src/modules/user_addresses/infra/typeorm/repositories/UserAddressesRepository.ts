import { getRepository, Repository } from 'typeorm';
import IUserAddressesRepositoryDTO from '@modules/user_addresses/repositories/IUserAddressesRepository';
import ICreateUserAddressDTO from '@modules/user_addresses/dtos/ICreateUserAddressDTO';

import UserAddress from '../entities/UserAddress';

class UserAddressesRepository implements IUserAddressesRepositoryDTO {
  private ormRepository: Repository<UserAddress>;

  constructor() {
    this.ormRepository = getRepository(UserAddress);
  }

  public async findById(id: string): Promise<UserAddress | undefined> {
    const userAddress = await this.ormRepository.findOne(id);

    return userAddress;
  }

  public async findUserAddresses(user_id: string): Promise<UserAddress[]> {
    const userAddresses = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return userAddresses;
  }

  public async create(
    userAddressData: ICreateUserAddressDTO,
  ): Promise<UserAddress> {
    const userAddressCreator = this.ormRepository.create(userAddressData);

    await this.ormRepository.save(userAddressCreator);

    return userAddressCreator;
  }

  public async save(userAddress: UserAddress): Promise<UserAddress> {
    return this.ormRepository.save(userAddress);
  }
}

export default UserAddressesRepository;
