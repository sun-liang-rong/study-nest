import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Interview extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  allInterview: string
  @Column()
  dayInterview: string
  @Column()
  timeDate: string
  @Column()
  bookId: string
}