import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
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

    const updatedUser = await updateProfileService.execute({
      id: user.id,
      name: 'Cleython',
      email: 'cleython@gmail.com',
      password: '12357234',
      birthday_date: date,
      description: 'achei bem interessante',
      phone_number: '123123213',
      telegram: 'telegramcleyton.com',
      whatsapp: 'whatsappcleyton.com',
      facebook: 'facebookcleyton.com',
    });

    expect(updatedUser.name).toBe('Cleython');
    expect(updatedUser.email).toBe('cleython@gmail.com');
    expect(updatedUser.password).toBe('12357234');
    expect(updatedUser.birthday_date).toBe(date);
    expect(updatedUser.description).toBe('achei bem interessante');
    expect(updatedUser.phone_number).toBe('123123213');
    expect(updatedUser.telegram).toBe('telegramcleyton.com');
    expect(updatedUser.whatsapp).toBe('whatsappcleyton.com');
    expect(updatedUser.facebook).toBe('facebookcleyton.com');
  });
});
