import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('type_company')
export class TypeCompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description', length: 50,type:'varchar' })
  description: string;

  @OneToMany(() => CompanyEntity,type=>type.typeCompany)
  company: CompanyEntity[];
}