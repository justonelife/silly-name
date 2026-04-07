import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bid } from './bid.entity';

export type ItemStatus = 'LIVE' | 'ENDED';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  creator: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @Column('decimal', { precision: 18, scale: 6 })
  startingPrice: number;

  @Column('decimal', { precision: 18, scale: 6 })
  currentPrice: number;

  @Column({ default: 24 })
  auctionDurationHours: number;

  @Column({ type: 'timestamptz' })
  auctionEndAt: Date;

  @Column({ default: 'LIVE' })
  status: ItemStatus;

  @OneToMany(() => Bid, (bid) => bid.item)
  bids: Bid[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
