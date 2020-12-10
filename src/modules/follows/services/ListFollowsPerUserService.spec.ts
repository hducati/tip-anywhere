import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeFollowsRepository from '../repositories/fakes/FakeFollowsRepository';
import ListFollowsPerUserService from './ListFollowsPerUserService';

let fakeUsersRepository: FakeUserRepository;
let fakeFollowsRepository: FakeFollowsRepository;
let listFollowsService: ListFollowsPerUserService;

describe('ListFollowsService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeFollowsRepository = new FakeFollowsRepository();
    listFollowsService = new ListFollowsPerUserService(
      fakeFollowsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list the followers', async () => {
    const date = new Date();

    const followerUser = await fakeUsersRepository.create({
      name: 'Felipe Santos',
      email: 'felipesantos@gmail.com',
      password: '12357234',
      birthday_date: date,
    });

    const notFollowerUser = await fakeUsersRepository.create({
      name: 'Ricardo Pereira',
      email: 'ricardo_pereira@gmail.com',
      password: 'interessante',
      birthday_date: date,
    });

    const followedUser = await fakeUsersRepository.create({
      name: 'Amaro Santos',
      email: 'amarosantos@gmail.com',
      password: 'amaro1234',
      birthday_date: date,
    });

    const follow1 = await fakeFollowsRepository.create({
      followed_user_id: followedUser.id,
      follower_user_id: followerUser.id,
    });

    const follow2 = await fakeFollowsRepository.create({
      followed_user_id: followedUser.id,
      follower_user_id: followerUser.id,
    });

    await fakeFollowsRepository.create({
      followed_user_id: followedUser.id,
      follower_user_id: notFollowerUser.id,
    });

    const [follows, countOfFollowers] = await listFollowsService.execute({
      follower_user_id: followerUser.id,
    });

    expect(follows).toEqual([follow1, follow2]);
    expect(countOfFollowers).toBe(2);
  });

  it('should not be able to list from a non-exist user', async () => {
    await expect(
      listFollowsService.execute({
        follower_user_id: 'follower',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
