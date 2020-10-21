export default interface ICreateUserDTO {
  name: string;
  birthday_date: Date;
  email: string;
  description: string;
  password: string;
  phone_number?: string;
  telegram?: string;
  whatsapp?: string;
  facebook?: string;
}
