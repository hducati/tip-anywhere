import CreateFollowService from '@modules/follows/services/CreateFollowService';
import UpdateFollowService from '@modules/follows/services/UpdateFollowService';
import ListFollowsPerUserService from '@modules/follows/services/ListFollowsPerUserService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

export default class FollowsConstroller {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { follow_user_id } = request.body ? request.body : null;

    const listFollows = container.resolve(ListFollowsPerUserService);

    const [follows, countOfFollows] = follow_user_id
      ? await listFollows.execute({
          followed_user_id: follow_user_id,
        })
      : await listFollows.execute({
          follower_user_id: user_id,
        });

    return response.json([follows, countOfFollows]);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const follower_user_id = request.user.id;

    const { followed_user_id } = request.body;

    const createFollow = container.resolve(CreateFollowService);

    const follow = await createFollow.execute({
      follower_user_id,
      followed_user_id,
    });

    return response.json(follow);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const follower_user_id = request.user.id;

    const { id } = request.body;

    const updateFollow = container.resolve(UpdateFollowService);

    const follow = await updateFollow.execute({ id, follower_user_id });

    return response.json(classToClass(follow));
  }
}
