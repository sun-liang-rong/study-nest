import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable  } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
@Entity()
export class Permissions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  //
  @Column({nullable: true})
  slug: string;

  @Column()
  description: string;

  @ManyToMany(type => User, user => user.permissionss)
  users: User[];
}