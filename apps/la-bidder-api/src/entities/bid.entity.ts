import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  itemId!: string;

  @ManyToOne(() => Item, (item) => item.bids, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'itemId' })
  item!: Item;

  @Column()
  userId!: string;

  @Column('decimal', { precision: 18, scale: 6 })
  amount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
