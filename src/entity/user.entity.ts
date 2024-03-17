import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, AfterLoad } from 'typeorm';
import { RoleUserEntity } from './role-user.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', length: 85 })
  firstName: string;

  @Column({ name: 'last_name', length: 80 })
  lastName: string;

  @Column({ length: 100 ,name:"email"})
  email: string;

  @Column({ name: 'email_verified', default: 0 })
  emailVerified: number;

  @Column({ length: 200, nullable: true,name:"image" })
  image: string;
  @Column({ length: 256, nullable: false,name:"password" })
  password: string;

  @Column({ default: 1 ,name:"status"})
  status: number;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'updated_at' })
  updatedAt: number;

  /*updated:string
  @AfterLoad()
  setCombined() {
    this.updated =  new Date(this.updatedAt).toDateString()
  }*/

  @OneToMany(() => RoleUserEntity, roleUser => roleUser.user)
  roles: RoleUserEntity[];

}