import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { User } from 'src/users/entities/user.entity';
import { RequestStatus } from 'src/Enums/requests.enum';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';


@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestRepo: Repository<Request>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async create(createDto: CreateRequestDto, ownerId: number) {
    const owner = await this.userRepo.findOneBy({ id: ownerId });
    if (!owner) {
      throw new NotFoundException(`Owner not found`);
  }
    if (!createDto.sitterId) throw new NotFoundException(`Sitter ID is required`);
    const sitter = await this.userRepo.findOneBy({ id: createDto.sitterId });
    if (!sitter) throw new NotFoundException(`Sitter not found`);

    const request = this.requestRepo.create({
      animalType: createDto.animalType,
      petName: createDto.petName,
      startDate: createDto.startDate,
      endDate: createDto.endDate,
      description: createDto.description,
      owner,
      sitter,
    } as Request);
    
    const savedRequest = await this.requestRepo.save(request);

    //websocket logic
     // Notify the sitter that a new request has been made
    this.notificationsGateway.sendToUser(sitter.id.toString(), 'newRequest', {
      requestId: savedRequest.id,
      petName: savedRequest.petName,
      ownerId: owner.id,
    });

    return savedRequest;
  }

  findByOwner(ownerId: number) {
    return this.requestRepo.find({ 
      where: { owner: { id: ownerId }  },
      relations: ['sitter'] 
    });
  }

  findBySitter(sitterId: number) {
    return this.requestRepo.find({
      where: { sitter: { id: sitterId } },
      relations: ['owner']
      });
  }
  // Accept a request and notify the owner 
  async acceptRequest(requestId: number) {
  const request = await this.requestRepo.findOne({
    where: { id: requestId },
    relations: ['owner', 'sitter'],
  });

  if (!request) {
    throw new NotFoundException(`Request not found`);
  }

  request.status = RequestStatus.ACCEPTED;

  const savedRequest = await this.requestRepo.save(request);

    // Notify the owner that the sitter accepted
    this.notificationsGateway.sendToUser(request.owner.id.toString(), 'requestAccepted', {
      requestId: savedRequest.id,
      sitterId: request.sitter.id,
    });

    return savedRequest;
}

  async refuseRequest(id: number) {
  const request = await this.requestRepo.findOne({
    where: { id },
    relations: ['owner', 'sitter']
  });

  if (!request) {
    throw new NotFoundException(`Request not found`);
  }

  request.status = RequestStatus.REFUSED;

  const savedRequest = await this.requestRepo.save(request);

    // Notify the owner that the sitter refused
    this.notificationsGateway.sendToUser(request.owner.id.toString(), 'requestRefused', {
      requestId: savedRequest.id,
      sitterId: request.sitter.id,
    });

    return savedRequest;
}
  
}
