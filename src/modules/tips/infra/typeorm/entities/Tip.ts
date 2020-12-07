import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('tips')
class Tip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @Column()
  odd: number;

  @Column()
  sport: string;

  @Column()
  tip: string;

  @Column()
  league: string;

  @Column()
  game: string;

  @Column()
  unit: number;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  closed: boolean;

  @Column({ type: 'timestamp with time zone' })
  scheduled_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tip;
