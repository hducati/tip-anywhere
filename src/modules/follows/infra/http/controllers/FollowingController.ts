import ListFollowingService from '@modules/follows/services/ListFollowingService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class FollowersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const followed_user_id = request.user.id;

    const listFollowing = container.resolve(ListFollowingService);

    const [followers, countFollowing] = await listFollowing.execute({
      followed_user_id,
    });

    return response.json([followers, countFollowing]);
  }
}
