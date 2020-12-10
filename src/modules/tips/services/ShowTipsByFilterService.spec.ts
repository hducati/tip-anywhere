import AppError from '@shared/errors/AppError';
import FakeTipsRepository from '../repositories/fakes/FakeTipsRepository';
import ShowTipsByFilterService from './ShowTipsByFilterService';

let fakeTipsRepository: FakeTipsRepository;
let showTipsByFilterService: ShowTipsByFilterService;

describe('ShowTipsByFilter', () => {
  beforeEach(() => {
    fakeTipsRepository = new FakeTipsRepository();
    showTipsByFilterService = new ShowTipsByFilterService(fakeTipsRepository);
  });

  it('should be able to filter by the value provided', async () => {
    const tip1 = await fakeTipsRepository.create({
      provider_id: 'provider',
      odd: 2,
      sport: 'Futebol',
      tip: 'Escanteio antes dos 20 minutos',
      game: 'Palmeiras x Santos',
      unit: 2,
      description: 'Entrar nos 9 minutos',
      status: 'Red',
      league: 'XXXX',
    });

    const tip2 = await fakeTipsRepository.create({
      provider_id: 'provider',
      odd: 3,
      sport: 'Futebol',
      tip: 'Gol antes dos 10 minutos',
      game: 'Barcelona x Real',
      unit: 5,
      status: 'Green',
      league: 'XXXX',
    });

    const [tips, countOfTips] = await showTipsByFilterService.execute({
      sport: 'Futebol',
    });

    expect(tips).toEqual([tip1, tip2]);
    expect(countOfTips).toBe(2);
  });

  it('should not be able to filter by a invalid value', async () => {
    await expect(
      showTipsByFilterService.execute({ sport: '1111' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
