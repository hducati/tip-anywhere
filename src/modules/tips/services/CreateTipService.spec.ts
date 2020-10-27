import 'reflect-metadata';
import FakeTipsRepository from '../repositories/fakes/FakeTipsRepository';
import CreateTipService from './CreateTipService';

let fakeTipsRepository: FakeTipsRepository;
let createTipService: CreateTipService;

describe('CreateTip', () => {
  beforeEach(() => {
    fakeTipsRepository = new FakeTipsRepository();
    createTipService = new CreateTipService(fakeTipsRepository);
  });

  it('should be able to create a new tip', async () => {
    const tipCreate = await createTipService.execute({
      provider_id: 'provider',
      odd: 2,
      sport: 'Futebol',
      tip: 'Futebol é legal',
      game: 'Palmeiras x Santos',
      unit: 2,
      description: 'bem interessante esse jogo',
      status: 'Green',
    });

    expect(tipCreate).toHaveProperty('id');
  });
});
