import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeFollowsRepository from '../repositories/fakes/FakeFollowsRepository';
import ListFollowsService from './ListFollowsService';

let fakeUsersRepository: FakeUserRepository;
let fakeFollowsRepository: FakeFollowsRepository;
let listFollowsService: ListFollowsService;

describe('ListFollowsService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeFollowsRepository = new FakeFollowsRepository();
    listFollowsService = new ListFollowsService(
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

    const follow3 = await fakeFollowsRepository.create({
      followed_user_id: followedUser.id,
      follower_user_id: notFollowerUser.id,
    });

    const [follows, countOfFollowers] = await listFollowsService.execute({
      user_id: followedUser.id,
    });

    expect(follows).toEqual([follow1, follow2, follow3]);
    expect(countOfFollowers).toBe(3);
  });

  it('should not be able to list from a non-exist user', async () => {
    await expect(
      listFollowsService.execute({
        user_id: 'follower',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
