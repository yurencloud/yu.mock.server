import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty({description: '密码'})
  @Column()
  password: string;

  @ApiModelProperty({description: '昵称'})
  @Column()
  name: string;

  @ApiModelProperty({description: '头像'})
  @Column()
  logo: string;

  @ApiModelProperty({description: '账号'})
  @Column()
  account: string;

  @Column()
  mobile: string;

  @Column()
  needChangePassword: boolean;

  @Column()
  userCode: string;

  @Column({ type: 'datetime' })
  lastPasswordResetDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
