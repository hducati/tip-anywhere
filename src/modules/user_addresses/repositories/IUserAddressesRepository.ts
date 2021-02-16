import UserAddress from '../infra/typeorm/entities/UserAddress';
import ICreateUserAddressDTO from '../dtos/ICreateUserAddressDTO';

export default interface IUserAddressesRepository {
  findById(id: string): Promise<UserAddress | undefined>;
  findUserAddresses(user_id: string): Promise<[UserAddress]>;
  create(data: ICreateUserAddressDTO): Promise<UserAddress>;
  save(user_address: UserAddress): Promise<UserAddress>;
}
