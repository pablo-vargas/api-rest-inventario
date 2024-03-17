import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TypeCompanyEntity } from './type-company.entity';

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 100 })
  nit: string;


  @Column({ name: 'id_type_company' })
  typeIdCompany: number;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 200, nullable: true })
  logo: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  city: string;

  @Column({ name: 'footer_print', length: 500 })
  footerPrint: string;

  @Column({ name: 'header_print', length: 500 })
  headerPrint: string;

  @Column({ default: 1 })
  status: number;

  @Column({ name: 'created_at', type: 'bigint',default:new Date().getTime() })
  createdAt: number;

  @Column({ name: 'updated_at', type: 'bigint',default:new Date().getTime() })
  updatedAt: number;

  @ManyToOne(() => TypeCompanyEntity,type=>type.company)
  @JoinColumn({name:'id_type_company'})
  typeCompany: TypeCompanyEntity;


}