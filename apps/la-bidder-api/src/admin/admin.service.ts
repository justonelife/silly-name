import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepo: Repository<Item>
  ) {}

  createItem(dto: CreateItemDto) {
    const auctionEndAt = new Date();
    auctionEndAt.setHours(auctionEndAt.getHours() + dto.auctionDurationHours);

    const item = this.itemsRepo.create({
      name: dto.name,
      creator: dto.creator,
      description: dto.description,
      imageUrl: dto.imageUrl,
      tags: dto.tags ?? [],
      startingPrice: dto.startingPrice,
      currentPrice: dto.startingPrice,
      auctionDurationHours: dto.auctionDurationHours,
      auctionEndAt,
      status: 'LIVE',
    });

    return this.itemsRepo.save(item);
  }
}
