import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListFollowsPerUserService from '@modules/follows/services/ListFollowsPerUserService';

export default class FollowingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.body ? request.body : request.user.id;

    const listFollows = container.resolve(ListFollowsPerUserService);

    const [followers, countOfFollowers] = await listFollows.execute({
      followed_user_id: user_id,
    });

    return response.json([followers, countOfFollowers]);
  }
}
