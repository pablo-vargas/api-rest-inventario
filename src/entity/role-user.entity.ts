import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

@Entity('role_user')
export class RoleUserEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_role',type:'int' })
  roleId: number;

  @Column({ name: 'id_user',type:'int' })
  userId: number;

  @Column({ name: 'id_company',type:'int' })
  companyId: number;

  @ManyToOne(() => UserEntity, user => user.roles)
  @JoinColumn({ name: 'id_user' })
  user: UserEntity;

  @OneToOne(()=>RoleEntity, rol=> rol.role)
  @JoinColumn({name:'id_role'})
  role:RoleEntity

}