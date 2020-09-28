import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const date = new Date();
    const user = await fakeUsersRepository.create({
      name: 'Felipe Santos',
      email: 'felipesantos@gmail.com',
      password: '12357234',
      birthday_date: date,
      description: 'achei bem interessante',
      phone_number: '123123213',
      telegram: 'sdasdsadsa',
      whatsapp: 'asdasda',
      facebook: 'daswdsadaw',
    });

    const response = await authenticateUser.execute({
      email: 'felipesantos@gmail.com',
      password: '12357234',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existence user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'felipesantos@gmail.com',
        password: '12357234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const date = new Date();

    await fakeUsersRepository.create({
      name: 'Felipe Santos',
      email: 'felipesantos@gmail.com',
      password: '12357234',
      birthday_date: date,
      description: 'achei bem interessante',
      phone_number: '123123213',
      telegram: 'sdasdsadsa',
      whatsapp: 'asdasda',
      facebook: 'daswdsadaw',
    });

    await expect(
      authenticateUser.execute({
        email: 'felipesantos@gmail.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
