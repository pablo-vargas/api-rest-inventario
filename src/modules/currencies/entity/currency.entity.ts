import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('divisa')
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'currency', length: 5 })
  currency: string;

  @Column({ name: 'value', type:'decimal', precision: 20, scale: 8  })
  value: number;

}