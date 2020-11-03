import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('follows')
class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  followed_user_id: string;

  @Column()
  follower_user_id: string;

  @Column()
  is_following: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'followed_user_id' })
  followed_user: User;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'follower_user_id' })
  follower_user: User;
}

export default Follow;
