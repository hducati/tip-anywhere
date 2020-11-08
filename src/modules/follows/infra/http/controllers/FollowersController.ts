import ListFollowersService from '@modules/follows/services/ListFollowersService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class FollowersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const follower_user_id = request.user.id;

    const listFollowers = container.resolve(ListFollowersService);

    const [followers, countFollowers] = await listFollowers.execute({
      follower_user_id,
    });

    return response.json([followers, countFollowers]);
  }
}
