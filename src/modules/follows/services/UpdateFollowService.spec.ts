import AppError from '@shared/errors/AppError';
import FakeFollowsRepository from '../repositories/fakes/FakeFollowsRepository';
import UpdateFollowService from './UpdateFollowService';

let fakeFollowsRepository: FakeFollowsRepository;
let updateFollowService: UpdateFollowService;

describe('UpdateFollow', () => {
  beforeEach(() => {
    fakeFollowsRepository = new FakeFollowsRepository();
    updateFollowService = new UpdateFollowService(fakeFollowsRepository);
  });

  it('should not be able to update a non-exist follow', async () => {
    await expect(
      updateFollowService.execute({
        id: 'invalid',
        follower_user_id: 'invalid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a follow not created by himself', async () => {
    const follow = await fakeFollowsRepository.create({
      followed_user_id: 'followed-user',
      follower_user_id: 'follower-user',
    });

    await expect(
      updateFollowService.execute({
        id: follow.id,
        follower_user_id: 'invalid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the follow', async () => {
    const follow = await fakeFollowsRepository.create({
      followed_user_id: 'followed-user',
      follower_user_id: 'follower-user',
      is_following: true,
    });

    const updateTip = await updateFollowService.execute({
      id: follow.id,
      follower_user_id: follow.follower_user_id,
    });

    expect(updateTip.is_following).toBeFalsy();
  });
});
