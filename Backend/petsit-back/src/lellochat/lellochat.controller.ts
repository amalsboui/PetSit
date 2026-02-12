import { Body, Controller, Post } from '@nestjs/common';
import { LellochatService } from './lellochat.service';

@Controller('lellochat')
export class LellochatController {
  constructor(private readonly lellochatService: LellochatService) {}
  @Post()
  async chat(@Body('message') message: string) {
    const reply = await this.lellochatService.getReply(message);
    return { reply };
  }
}
