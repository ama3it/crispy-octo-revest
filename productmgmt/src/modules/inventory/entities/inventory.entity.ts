import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { ProductVariant } from '../../product/entities/product-variant.entity';

@Entity('inventories')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ProductVariant, (variant) => variant.inventory, { onDelete: 'CASCADE' })
  variant: ProductVariant;

  @Column({ unique: true })
  sku: string;

  @Column({ type: 'int', default: 0 })
  quantityAvailable: number;

  @Column({ type: 'int', default: 0 })
  quantityReserved: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
