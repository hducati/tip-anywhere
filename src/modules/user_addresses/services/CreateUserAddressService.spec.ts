import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserAddressService from './CreateUserAddressService';
import FakeUserAddressesRepository from '../repositories/fakes/UserAddressesRepository';

let fakeUserAddressesRepository: FakeUserAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let createUserAddress: CreateUserAddressService;

describe('CreateUserAddresses', () => {
  beforeEach(() => {
    fakeUserAddressesRepository = new FakeUserAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createUserAddress = new CreateUserAddressService(
      fakeUserAddressesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new address', async () => {
    const date = new Date();
    const user = await fakeUsersRepository.create({
      name: 'Felipe Santos',
      email: 'felipesantos@gmail.com',
      password: 'felipe4241',
      birthday_date: date,
      description: 'achei bem interessante',
      phone_number: '19971295232',
    });

    const userAddress = await createUserAddress.execute({
      user_id: user.id,
      country: 'Brasil',
      zip_code: '305213',
    });

    expect(userAddress).toHaveProperty('id');
  });
});
