import AppError from '@shared/errors/AppError';
import FakeTipsRepository from '../repositories/fakes/FakeTipsRepository';
import ShowTipService from './ShowTipService';

let fakeTipsRepository: FakeTipsRepository;
let listTip: ShowTipService;

describe('ListTip', () => {
  beforeEach(() => {
    fakeTipsRepository = new FakeTipsRepository();
    listTip = new ShowTipService(fakeTipsRepository);
  });

  it('should be able to list a existing tip', async () => {
    const createTip = await fakeTipsRepository.create({
      provider_id: 'provider',
      odd: 2,
      sport: 'Futebol',
      tip: 'Vai sair 2 escanteios no primeiro tempo',
      game: 'Palmeiras x Santos',
      unit: 2,
      description: 'Fiquem espertos no final do jogo',
      status: 'Green',
    });

    const { id } = createTip;

    const tipProfile = await listTip.execute({ id });

    expect(id).toEqual(tipProfile.id);
  });

  it('should be able to not list a non existing tip', async () => {
    expect(listTip.execute({ id: 'invalid' })).rejects.toBeInstanceOf(AppError);
  });
});
