import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Length(6, 20)
  @Column()
  password: string;

  @ApiModelProperty()
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
