import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint', comment: '0 菜单, 1 一级目录, 2 二级目录' })
  level: number;

  @Column({ type: 'int', comment: '上级目录id' })
  pid: number;

  @Column({ type: 'int', comment: '上上级目录id' })
  gid: number;

  @Column({ type: 'varchar', comment: '目录名称' })
  name: string;

  @Column({ type: 'tinyint', comment: '0 开启 1 关闭' })
  off: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
