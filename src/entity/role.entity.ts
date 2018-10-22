import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('int')
  roleId: number;
}
