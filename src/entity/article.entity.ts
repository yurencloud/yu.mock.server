import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('int')
  catalogId: number;

  @Column('text')
  content: string;

  @Column({ type: 'tinyint', comment: '0 不置顶 1 置顶', default: 0 })
  top: number;

  @Column({ type: 'tinyint', comment: '0 不推荐 1 推荐', default: 0 })
  recommend: number;

  @Column({ type: 'int', comment: '浏览量', default: 0 })
  view: number;

  @Column({ type: 'int', comment: '点赞量', default: 0 })
  good: number;

  @Column({ type: 'int', comment: '文章字数', default: 0 })
  words: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
