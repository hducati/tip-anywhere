import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeTipsRepository from '@modules/tips/repositories/fakes/FakeTipsRepository';
import ShowTotalTipsPerTipsterService from './ShowTotalTipsPerTipsterService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTipsRepository: FakeTipsRepository;
let showTotalTipsPerTipsterService: ShowTotalTipsPerTipsterService;

describe('ShowTipsPerTipster', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTipsRepository = new FakeTipsRepository();
    showTotalTipsPerTipsterService = new ShowTotalTipsPerTipsterService(
      fakeTipsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all the tips from a tipster', async () => {
    const date = new Date();
    const user = await fakeUsersRepository.create({
      name: 'Felipe Santos',
      email: 'felipesantos@gmail.com',
      password: 'felipe4241',
      birthday_date: date,
      description: 'achei bem interessante',
      phone_number: '19971295232',
    });

    const tip1 = await fakeTipsRepository.create({
      provider_id: user.id,
      odd: 2,
      sport: 'Futebol',
      tip: 'Futebol é legal',
      game: 'Palmeiras x Santos',
      unit: 2,
      description: 'bem interessante esse jogo',
      status: 'Green',
    });
    const tip2 = await fakeTipsRepository.create({
      provider_id: user.id,
      odd: 2,
      sport: 'Futebol',
      tip: 'Fiquem esperto no escanteio',
      game: 'Palmeiras x Santos',
      unit: 2,
      description: 'por volta dos 2 minutos',
      status: 'Green',
    });

    const [tips, countOfTips] = await showTotalTipsPerTipsterService.execute({
      provider_id: user.id,
    });

    expect(tips).toEqual([tip1, tip2]);
    expect(countOfTips).toBe(2);
  });

  it('should not be able to list from a non-exist user', async () => {
    await expect(
      showTotalTipsPerTipsterService.execute({
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
