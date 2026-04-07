import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Bid } from '../entities/bid.entity';
import { Item } from '../entities/item.entity';
import { BiddingGateway } from '../bidding/bidding.gateway';

@Injectable()
export class AuctionSchedulerService {
  private readonly logger = new Logger(AuctionSchedulerService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepo: Repository<Item>,
    @InjectRepository(Bid)
    private readonly bidsRepo: Repository<Bid>,
    private readonly biddingGateway: BiddingGateway
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async closeExpiredAuctions() {
    const expiredItems = await this.itemsRepo.find({
      where: { status: 'LIVE', auctionEndAt: LessThan(new Date()) },
    });

    for (const item of expiredItems) {
      await this.itemsRepo.update(item.id, { status: 'ENDED' });

      const winningBid = await this.bidsRepo.findOne({
        where: { itemId: item.id },
        order: { amount: 'DESC' },
      });

      this.biddingGateway.emitAuctionEnded({
        itemId: item.id,
        winnerUserId: winningBid?.userId ?? null,
        winningAmount: winningBid ? Number(winningBid.amount) : null,
      });

      this.logger.log(
        `Auction closed for item ${item.id} (${item.name}). Winner: ${
          winningBid?.userId ?? 'none'
        }`
      );
    }
  }
}
