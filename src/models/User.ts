import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthday_date: Date;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  password: string;

  @Column({
    length: 13,
  })
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
