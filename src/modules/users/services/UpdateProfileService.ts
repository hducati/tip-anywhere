import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
  name: string;
  birthday_date: Date;
  email: string;
  description: string;
  phone_number: string;
  telegram: string;
  whatsapp: string;
  facebook: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    birthday_date,
    email,
    description,
    phone_number,
    telegram,
    whatsapp,
    facebook,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const userEmail = await this.usersRepository.findByEmail(email);

    if (userEmail && userEmail.id !== id) {
      throw new AppError('Email already in use');
    }

    user.name = name;
    user.email = email;
    user.description = description;
    user.phone_number = phone_number;
    user.birthday_date = birthday_date;
    user.telegram = telegram;
    user.whatsapp = whatsapp;
    user.facebook = facebook;

    if (password && old_password) {
      const verifyOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!verifyOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
