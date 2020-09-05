import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Profile } from "./profile.entity";

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  REGULAR = 'regular'
};

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.REGULAR,
  })
  role: UserRole

  @OneToOne(type => Profile)
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
