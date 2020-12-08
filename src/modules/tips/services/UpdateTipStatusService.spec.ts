import AppError from '@shared/errors/AppError';
import FakeTipsRepository from '../repositories/fakes/FakeTipsRepository';
import UpdateTipStatusService from './UpdateTipStatusService';

let fakeTipsService: FakeTipsRepository;
let updateTipStatusService: UpdateTipStatusService;

describe('UpdateTips', () => {
  beforeEach(() => {
    fakeTipsService = new FakeTipsRepository();
    updateTipStatusService = new UpdateTipStatusService(fakeTipsService);
  });

  it('should be able to update the tip', async () => {
    const tip = await fakeTipsService.create({
      provider_id: 'provider',
      odd: 2,
      sport: 'Futebol',
      tip: 'Futebol é legal',
      game: 'Palmeiras x Santos',
      unit: 2,
      description: 'bem interessante esse jogo',
      status: 'Green',
    });

    const updateTip = await updateTipStatusService.execute({
      provider_id: 'provider',
      id: tip.id,
      status: 'Red',
    });

    expect(updateTip.status).toBe('Red');
    expect(updateTip.closed).toBe(true);
  });

  it('should not be able to update a non-exist tip', async () => {
    await expect(
      updateTipStatusService.execute({
        provider_id: 'provider',
        id: 'tip-random',
        status: 'Red',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a tip already closed', async () => {
    const tip = await fakeTipsService.create({
      provider_id: 'provider',
      odd: 2,
      sport: 'Futebol',
      tip: 'Futebol é legal',
      game: 'Palmeiras x Santos',
      unit: 2,
      description: 'bem interessante esse jogo',
      status: 'Green',
      closed: true,
    });

    await expect(
      updateTipStatusService.execute({
        provider_id: 'provider',
        id: tip.id,
        status: 'Red',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
