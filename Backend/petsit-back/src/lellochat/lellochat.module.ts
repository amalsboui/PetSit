import { Module } from '@nestjs/common';
import { LellochatService } from './lellochat.service';
import { LellochatController } from './lellochat.controller';

@Module({
  controllers: [LellochatController],
  providers: [LellochatService],
})
export class LellochatModule {}
