import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ length: 64 })
  username: string;

  @Column()
  password: string;

  @Column({ length: 64, default: '/img/default.png' })
  avatar: string;

  @Column({ length: 64 })
  nickname: string;

  @Column({ type: 'datetime' })
  lastPasswordResetDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
