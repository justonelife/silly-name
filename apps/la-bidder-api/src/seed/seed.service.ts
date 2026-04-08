import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';

const SEED_ITEMS = [
  {
    name: 'Xmas Goblin',
    creator: 'LunaAI',
    description: 'Limited holiday edition Labubu with festive green outfit',
    tags: ['holiday', 'limited', 'green'],
    startingPrice: 1.85,
    auctionDurationHours: 24,
  },
  {
    name: 'Baby Boy',
    creator: 'LunaAI',
    description: 'Classic baby-faced Labubu in blue palette',
    imageUrl: undefined,
    tags: ['classic', 'blue', 'baby'],
    startingPrice: 9.3,
    auctionDurationHours: 12,
  },
  {
    name: 'Christmas Girl',
    creator: 'MujiTeam',
    description: 'Winter special with red and white Labubu design',
    tags: ['christmas', 'winter', 'limited'],
    startingPrice: 5.2,
    auctionDurationHours: 48,
  },
];

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepo: Repository<Item>,
    private readonly configService: ConfigService
  ) {}

  async onApplicationBootstrap() {
    const shouldSeed = this.configService.get<string>('SEED_DATA') === 'true';
    if (!shouldSeed) return;

    const count = await this.itemsRepo.count();
    if (count > 0) {
      this.logger.log('Seed skipped: items already exist');
      return;
    }

    for (const seed of SEED_ITEMS) {
      const auctionEndAt = new Date();
      auctionEndAt.setHours(
        auctionEndAt.getHours() + seed.auctionDurationHours
      );

      const item = this.itemsRepo.create({
        ...seed,
        currentPrice: seed.startingPrice,
        auctionEndAt,
        status: 'LIVE',
      });
      await this.itemsRepo.save(item);
    }

    this.logger.log(`Seeded ${SEED_ITEMS.length} items`);
  }
}
