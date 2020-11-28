import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateFollowService from './CreateFollowService';
import FakeFollowsRepository from '../repositories/fakes/FakeFollowsRepository';

let fakeFollowsRepository: FakeFollowsRepository;
let createFollowService: CreateFollowService;
let fakeUsersRepository: FakeUserRepository;

describe('CreateFollow', () => {
  beforeEach(() => {
    fakeFollowsRepository = new FakeFollowsRepository();
    fakeUsersRepository = new FakeUserRepository();
    createFollowService = new CreateFollowService(
      fakeFollowsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new follow', async () => {
    const date = new Date();

    const follower_user = await fakeUsersRepository.create({
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

    const followed_user = await fakeUsersRepository.create({
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

    const follow = await createFollowService.execute({
      followed_user_id: followed_user.id,
      follower_user_id: follower_user.id,
    });

    expect(follow.follower_user_id).toEqual(follower_user.id);
    expect(follow.follower_user_id).toEqual(follower_user.id);
  });
});
