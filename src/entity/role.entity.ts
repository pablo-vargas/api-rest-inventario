import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne } from 'typeorm';
import { RoleUserEntity } from './role-user.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'description', length: 50,type:'varchar' })
    description: string;

    @OneToOne(()=>RoleUserEntity,roleUser=>roleUser.role)
    role:RoleUserEntity
  

}