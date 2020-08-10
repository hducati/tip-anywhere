import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  birthday_date: Date;
  email: string;
  description: string;
  password: string;
  phone_number: string;
  telegram: string;
  whatsapp: string;
  facebook: string;
}

class CreateUserService {
  public async execute({
    name,
    birthday_date,
    email,
    description,
    password,
    phone_number,
    telegram,
    whatsapp,
    facebook,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      birthday_date,
      email,
      description,
      password: hashedPassword,
      phone_number,
      telegram,
      whatsapp,
      facebook,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
