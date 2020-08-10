import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      birthday_date,
      email,
      description,
      password,
      phone_number,
      telegram,
      whatsapp,
      facebook,
    } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      birthday_date,
      email,
      description,
      password,
      phone_number,
      telegram,
      whatsapp,
      facebook,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ err: err.message });
  }
});

export default usersRouter;
