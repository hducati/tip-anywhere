import { uuid } from 'uuidv4';
import UserAddress from '@modules/user_addresses/infra/typeorm/entities/UserAddress';
import IUserAddressesRepository from '../IUserAddressesRepository';
import ICreateUserAddressDTO from '../../dtos/ICreateUserAddressDTO';

export default class UserAddressesRepository
  implements IUserAddressesRepository {
  private userAddresses: UserAddress[] = [];

  public async findById(id: string): Promise<UserAddress | undefined> {
    const userAddressFinder = this.userAddresses.find(
      userAddress => userAddress.id === id,
    );

    return userAddressFinder;
  }

  public async findUserAddresses(user_id: string): Promise<UserAddress[]> {
    const userAddressesFinder = this.userAddresses.filter(
      userAddress => userAddress.user_id === user_id,
    );

    return userAddressesFinder;
  }

  public async create(
    userAddressData: ICreateUserAddressDTO,
  ): Promise<UserAddress> {
    const addressCreator = new UserAddress();

    Object.assign(addressCreator, { id: uuid() }, userAddressData);

    this.userAddresses.push(addressCreator);

    return addressCreator;
  }

  public async save(userAddress: UserAddress): Promise<UserAddress> {
    const findIndex = this.userAddresses.findIndex(
      findAddress => findAddress.id === userAddress.id,
    );

    this.userAddresses[findIndex] = userAddress;

    return userAddress;
  }
}
