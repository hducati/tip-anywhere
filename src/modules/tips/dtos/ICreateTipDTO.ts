export default interface ICreateTipDTO {
  provider_id: string;
  odd: number;
  tip: string;
  league?: string;
  game: string;
  unit: number;
  description?: string;
  status?: string;
}
