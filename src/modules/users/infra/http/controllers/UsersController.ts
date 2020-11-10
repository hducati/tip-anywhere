import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      birthday_date,
      email,
      password,
      description,
      phone_number,
      telegram,
      whatsapp,
      facebook,
    } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      birthday_date,
      email,
      password,
      description,
      phone_number,
      telegram,
      whatsapp,
      facebook,
    });

    return response.json(classToClass(user));
  }
}
