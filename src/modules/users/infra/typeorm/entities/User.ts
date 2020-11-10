import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsDate, IsEmail, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @IsDate()
  birthday_date: Date;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  description: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Length(11, 13)
  phone_number: string;

  @Column()
  telegram: string;

  @Column()
  whatsapp: string;

  @Column()
  facebook: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
