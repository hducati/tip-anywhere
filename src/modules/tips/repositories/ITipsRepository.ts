import Tip from '../infra/typeorm/entities/Tip';
import ICreateTipDTO from '../dtos/ICreateTipDTO';
import ISearchFilterDTO from '../dtos/ISearchFilterDTO';

export default interface ITipsRepository {
  findById(id: string): Promise<Tip | undefined>;
  findAllTips(): Promise<Tip[]>;
  findByUser(provider_id: string): Promise<Tip[] | undefined>;
  findByFilter(filter: ISearchFilterDTO): Promise<Tip[] | undefined>;
  create(data: ICreateTipDTO): Promise<Tip>;
  save(tip: Tip): Promise<Tip>;
}
