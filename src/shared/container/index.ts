import { container } from 'tsyringe';
import '@modules/users/providers';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ITipsRepository from '@modules/tips/repositories/ITipsRepository';
import TipsRepository from '@modules/tips/infra/typeorm/repositories/TipsRepository';

import IFollowsRepository from '@modules/follows/repositories/IFollowsRepository';
import FollowsRepository from '@modules/follows/infra/typeorm/repositories/FollowsRepository';

import IUserAddressesRepository from '@modules/user_addresses/repositories/IUserAddressesRepository';
import UserAddressesRepository from '@modules/user_addresses/infra/typeorm/repositories/UserAddressesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IFollowsRepository>(
  'FollowsRepository',
  FollowsRepository,
);

container.registerSingleton<ITipsRepository>('TipsRepository', TipsRepository);

container.registerSingleton<IUserAddressesRepository>(
  'UserAddressesRepository',
  UserAddressesRepository,
);
