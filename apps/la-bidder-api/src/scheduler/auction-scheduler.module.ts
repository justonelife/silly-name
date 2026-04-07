import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from '../entities/bid.entity';
import { Item } from '../entities/item.entity';
import { BiddingModule } from '../bidding/bidding.module';
import { AuctionSchedulerService } from './auction-scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Bid]), BiddingModule],
  providers: [AuctionSchedulerService],
})
export class AuctionSchedulerModule {}
