import CreateFollowService from '@modules/follows/services/CreateFollowService';
import UpdateFollowService from '@modules/follows/services/UpdateFollowService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class FollowsConstroller {
  public async create(request: Request, response: Response): Promise<Response> {
    const follower_user_id = request.user.id;

    const { followed_user_id } = request.body;

    const createFollow = container.resolve(CreateFollowService);

    const follow = createFollow.execute({ follower_user_id, followed_user_id });

    return response.json(follow);
  }
}
