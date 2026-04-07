import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from '../entities/bid.entity';
import { Item } from '../entities/item.entity';
import { BiddingModule } from '../bidding/bidding.module';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Bid]), BiddingModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
