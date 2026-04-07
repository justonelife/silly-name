import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const adminKeyHeader = request.headers['x-admin-key'];

    if (!adminKeyHeader || adminKeyHeader !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Invalid or missing admin key');
    }

    return true;
  }
}
