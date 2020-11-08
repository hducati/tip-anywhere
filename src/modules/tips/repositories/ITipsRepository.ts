import Tip from '../infra/typeorm/entities/Tip';
import ICreateTipDTO from '../dtos/ICreateTipDTO';
import ISearchFilterDTO from '../dtos/ISearchFilterDTO';
import IFindAllTipsDTO from '../dtos/IFindAllTipsDTO';

export default interface ITipsRepository {
  findById(id: string): Promise<Tip | undefined>;
  findAllTips(data: IFindAllTipsDTO): Promise<Tip[]>;
  findByUser(provider_id: string): Promise<Tip[] | undefined>;
  findByFilter(filter: ISearchFilterDTO): Promise<Tip[] | undefined>;
  findByTotalTips(provider_id: string): Promise<[Tip[], number]>;
  create(data: ICreateTipDTO): Promise<Tip>;
  save(tip: Tip): Promise<Tip>;
}
