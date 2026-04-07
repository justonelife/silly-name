import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PlaceBidDto } from './dto/place-bid.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.itemsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Get(':id/bids')
  findBids(
    @Param('id') id: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    return this.itemsService.findBids(id, Number(page), Number(limit));
  }

  @Post(':id/bids')
  placeBid(@Param('id') id: string, @Body() dto: PlaceBidDto) {
    return this.itemsService.placeBid(id, dto);
  }
}
