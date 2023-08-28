import { PrimaryGeneratedColumn, Entity, Column, ManyToMany, JoinColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Permissions } from './permissions.entity'
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @ManyToMany(type => Permissions, permissions => permissions.users)
  @JoinColumn()
  permissions: Permissions[]
}