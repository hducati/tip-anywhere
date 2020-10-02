import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileServce', async () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
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

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Felipe Santos');
    expect(profile.email).toBe('felipesantos@gmail.com');
    expect(profile.password).toBe('12357234');
    expect(profile.birthday_date).toBe(date);
    expect(profile.description).toBe('achei bem interessante');
    expect(profile.phone_number).toBe('123123213');
    expect(profile.telegram).toBe('sdasdsadsa');
    expect(profile.whatsapp).toBe('asdasda');
    expect(profile.facebook).toBe('daswdsadaw');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
