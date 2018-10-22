import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Length(6, 20)
  @Column()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'datetime' })
  lastPasswordResetDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
