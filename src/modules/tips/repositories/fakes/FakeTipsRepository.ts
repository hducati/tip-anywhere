import { uuid } from 'uuidv4';
import Tip from '@modules/tips/infra/typeorm/entities/Tip';
import ITipsRepository from '../ITipsRepository';
import ICreateTipDTO from '../../dtos/ICreateTipDTO';
import ISearchFilterDTO from '../../dtos/ISearchFilterDTO';
import IFindAllTipsDTO from '../../dtos/IFindAllTipsDTO';

export default class FakeTipsRepository implements ITipsRepository {
  private tips: Tip[] = [];

  public async findById(id: string): Promise<Tip | undefined> {
    const findTip = this.tips.find(tip => tip.id === id);

    return findTip;
  }

  public async findByUser(provider_id: string): Promise<Tip[] | undefined> {
    const findUserTips = this.tips.filter(
      tip => tip.provider_id === provider_id,
    );

    return findUserTips;
  }

  public async findAllTips({
    except_provider_id,
  }: IFindAllTipsDTO): Promise<[Tip[], number]> {
    let { tips } = this;
    let countOfTips = this.tips.length;

    if (except_provider_id) {
      tips = this.tips.filter(tip => tip.provider_id !== except_provider_id);

      countOfTips = tips.length;
    }

    return [tips, countOfTips];
  }

  public async findByFilter({
    status,
    league,
    sport,
  }: ISearchFilterDTO): Promise<Tip[] | undefined> {
    const findTips = this.tips.filter(tip => {
      return (
        tip.status === status || tip.league === league || tip.sport === sport
      );
    });

    return findTips;
  }

  public async findByTotalTips(provider_id: string): Promise<[Tip[], number]> {
    const findTips = this.tips.filter(tip => tip.provider_id === provider_id);

    const total = this.tips.filter(tip => tip.provider_id === provider_id)
      .length;

    return [findTips, total];
  }

  public async create(tipData: ICreateTipDTO): Promise<Tip> {
    const tipCreate = new Tip();

    Object.assign(tipCreate, { id: uuid() }, tipData);

    this.tips.push(tipCreate);

    return tipCreate;
  }

  public async save(tip: Tip): Promise<Tip> {
    const findIndex = this.tips.findIndex(findTip => findTip.id === tip.id);

    this.tips[findIndex] = tip;

    return tip;
  }
}
