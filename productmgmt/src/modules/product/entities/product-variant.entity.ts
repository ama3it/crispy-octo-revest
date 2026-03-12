import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.variants, { onDelete: 'CASCADE' })
  product: Product;

  @Column({ unique: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  compareAtPrice: number;

  @Column({ type: 'jsonb', nullable: true })
  attributes: Record<string, any>;

  @OneToOne(() => Inventory, (inventory) => inventory.variant, { cascade: true })
  @JoinColumn()
  inventory: Inventory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
