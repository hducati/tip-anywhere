import AppError from '@shared/errors/AppError';
import FakeTipsRepository from '../repositories/fakes/FakeTipsRepository';
import ListSpecificTipService from './ListSpecificTipService';

let fakeTipsRepository: FakeTipsRepository;
let listTip: ListSpecificTipService;

describe('ListTip', () => {
  beforeEach(() => {
    fakeTipsRepository = new FakeTipsRepository();
    listTip = new ListSpecificTipService(fakeTipsRepository);
  });

  it('should be able to list a existing tip', async () => {
    const createTip = await fakeTipsRepository.create({
      provider_id: 'provider',
      odd: 2,
      sport: 'Futebol',
      tip: 'Futebol é legal',
      game: 'Palmeiras x Santos',
      unit: 2,
      description: 'bem interessante esse jogo',
      status: 'Green',
    });

    const { id } = createTip;

    const tipProfile = await listTip.execute({ id });

    expect(id).toEqual(tipProfile.id);
  });

  it('should be able to not list a non existing tip', async () => {
    expect(listTip.execute({ id: 'asdasd' })).rejects.toBeInstanceOf(AppError);
  });
});
