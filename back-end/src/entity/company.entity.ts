import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @OneToMany(type => User, user => user.company)
  @JoinColumn()
  users: User;
}
