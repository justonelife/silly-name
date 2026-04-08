import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateItemDto } from './dto/create-item.dto';
import { AdminKeyGuard } from './admin-key.guard';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AdminKeyGuard)
@ApiSecurity('X-Admin-Key')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('items')
  @ApiOperation({ summary: 'Create a new auction item (Admin only)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The item has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Unauthorized admin key.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
  })
  createItem(@Body() dto: CreateItemDto) {
    return this.adminService.createItem(dto);
  }
}
