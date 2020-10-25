import Tip from '../infra/typeorm/entities/Tip';
import ICreateTipDTO from '../dtos/ICreateTipDTO';

export default interface ITipsRepository {
  findById(id: string): Promise<Tip | undefined>;
  findAllTips(): Promise<Tip[]>;
  findByUser(provider_id: string): Promise<Tip[] | undefined>;
  findByStatus(status: string): Promise<Tip[] | undefined>;
  findByLeague(league: string): Promise<Tip[] | undefined>;
  findBySport(sport: string): Promise<Tip[] | undefined>;
  create(data: ICreateTipDTO): Promise<Tip>;
}
