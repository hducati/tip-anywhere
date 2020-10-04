import { container } from 'tsyringe';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherealMailProvider,
);
