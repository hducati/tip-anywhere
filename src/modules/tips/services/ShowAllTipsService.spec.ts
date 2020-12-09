import 'reflect-metadata';
import FakeTipsRepository from '../repositories/fakes/FakeTipsRepository';
import ShowAllTipsService from './ShowAllTipsService';

let fakeTipsRepository: FakeTipsRepository;
let showAllTipsService: ShowAllTipsService;

describe('ListTips', () => {
  beforeEach(() => {
    fakeTipsRepository = new FakeTipsRepository();
    showAllTipsService = new ShowAllTipsService(fakeTipsRepository);
  });

  it('should be able to list all tips', async () => {
    const tip1 = await fakeTipsRepository.create({
      provider_id: 'provider',
      odd: 2,
      sport: 'Futebol',
      tip: 'Futebol é legal',
      game: 'Palmeiras x Santos',
      unit: 2,
      description: 'bem interessante esse jogo',
      status: 'Green',
      league: 'Interessante',
    });

    const tip2 = await fakeTipsRepository.create({
      provider_id: 'provider',
      odd: 3,
      sport: 'Futebol',
      tip: 'Futebol é legal',
      game: 'Palmeiras x Santos',
      unit: 5,
      description: 'bem interessante esse jogo',
      status: 'Green',
      league: 'Interessante',
    });

    const loggedUser = await fakeTipsRepository.create({
      provider_id: 'provider_logged',
      odd: 3,
      sport: 'Futebol',
      tip: 'Futebol é legal',
      game: 'Palmeiras x Santos',
      unit: 5,
      description: 'bem interessante esse jogo',
      status: 'Green',
      league: 'Interessante',
    });

    const [tips, countOfTips] = await showAllTipsService.execute({
      except_provider_id: loggedUser.provider_id,
    });

    expect(tips).toEqual([tip1, tip2]);
    expect(countOfTips).toEqual(2);
  });
});
