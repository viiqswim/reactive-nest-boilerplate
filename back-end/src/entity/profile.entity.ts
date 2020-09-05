import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @Column()
    photo: string;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;

    @DeleteDateColumn()
    deletedAt;
}
