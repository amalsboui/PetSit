import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Request } from './entities/request.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Request, User]),
    NotificationsModule
    ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
