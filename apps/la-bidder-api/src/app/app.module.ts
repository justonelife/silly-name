import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { BiddingModule } from '../bidding/bidding.module';
import { Bid } from '../entities/bid.entity';
import { Item } from '../entities/item.entity';
import { ItemsModule } from '../items/items.module';
import { AuctionSchedulerModule } from '../scheduler/auction-scheduler.module';
import { SeedModule } from '../seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'labidder'),
        password: config.get('DB_PASSWORD', 'labidder_pass'),
        database: config.get('DB_NAME', 'labidder'),
        entities: [Item, Bid],
        synchronize: true,
        logging: process.env.NODE_ENV !== 'production',
      }),
    }),
    BiddingModule,
    ItemsModule,
    AdminModule,
    AuctionSchedulerModule,
    SeedModule,
  ],
})
export class AppModule {}
