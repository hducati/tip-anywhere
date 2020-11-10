import ListUsersService from '@modules/users/services/ListUsersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ListUsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const except_provider_id = request.user.id;

    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute({ except_provider_id });

    return response.json(users);
  }
}
