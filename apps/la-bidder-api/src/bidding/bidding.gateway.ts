import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/bidding',
})
export class BiddingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(BiddingGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-item')
  handleJoinItem(client: Socket, payload: { itemId: string }) {
    const room = `item-${payload.itemId}`;
    client.join(room);
    this.logger.log(`Client ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('leave-item')
  handleLeaveItem(client: Socket, payload: { itemId: string }) {
    client.leave(`item-${payload.itemId}`);
  }

  emitNewBid(payload: {
    itemId: string;
    userId: string;
    amount: number;
    currentPrice: number;
    timestamp: Date;
  }) {
    this.server.to(`item-${payload.itemId}`).emit('bid-new', payload);
  }

  emitAuctionEnded(payload: {
    itemId: string;
    winnerUserId: string | null;
    winningAmount: number | null;
  }) {
    this.server.to(`item-${payload.itemId}`).emit('auction-ended', payload);
  }
}
