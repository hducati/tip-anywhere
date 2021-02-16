import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Length } from 'class-validator';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('user_addresses')
class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  @Length(0, 40)
  country: string;

  @Column()
  @Length(0, 8)
  zip_code: string;

  @Column()
  @Length(0, 2)
  state: string;

  @Column()
  @Length(0, 60)
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  @Length(0, 8)
  number: string;

  @Column()
  complement: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserAddress;
