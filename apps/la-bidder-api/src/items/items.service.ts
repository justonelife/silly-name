import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from '../entities/bid.entity';
import { Item } from '../entities/item.entity';
import { BiddingGateway } from '../bidding/bidding.gateway';
import { PlaceBidDto } from './dto/place-bid.dto';

const MIN_BID_INCREMENT = 0.01;

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepo: Repository<Item>,
    @InjectRepository(Bid)
    private readonly bidsRepo: Repository<Bid>,
    private readonly biddingGateway: BiddingGateway
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.itemsRepo.findAndCount({
      where: { status: 'LIVE' },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const item = await this.itemsRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Item ${id} not found`);
    return item;
  }

  async findBids(itemId: string, page = 1, limit = 10) {
    await this.findOne(itemId);
    const [data, total] = await this.bidsRepo.findAndCount({
      where: { itemId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async placeBid(itemId: string, dto: PlaceBidDto) {
    const item = await this.findOne(itemId);

    if (item.status !== 'LIVE') {
      throw new BadRequestException('Auction is not live');
    }

    if (new Date() >= new Date(item.auctionEndAt)) {
      throw new BadRequestException('Auction has ended');
    }

    const minimumBid = Number(item.currentPrice) + MIN_BID_INCREMENT;
    if (dto.amount < minimumBid) {
      throw new BadRequestException(
        `Bid must be at least ${minimumBid.toFixed(6)} ETH (current: ${
          item.currentPrice
        } + ${MIN_BID_INCREMENT} increment)`
      );
    }

    const bid = this.bidsRepo.create({
      itemId,
      userId: dto.userId,
      amount: dto.amount,
    });
    await this.bidsRepo.save(bid);

    await this.itemsRepo.update(itemId, { currentPrice: dto.amount });

    this.biddingGateway.emitNewBid({
      itemId,
      userId: dto.userId,
      amount: dto.amount,
      currentPrice: dto.amount,
      timestamp: bid.createdAt,
    });

    return bid;
  }
}
