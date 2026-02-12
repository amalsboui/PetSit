import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { User } from 'src/users/entities/user.entity';
import { RequestStatus } from 'src/Enums/requests.enum';


@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestRepo: Repository<Request>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createDto: CreateRequestDto, ownerId: number) {
    const owner = await this.userRepo.findOneBy({ id: ownerId });
    const sitter = await this.userRepo.findOneBy({ id: createDto.sitterId });

    const request = this.requestRepo.create({
      animalType: createDto.animalType,
      petName: createDto.petName,
      startDate: createDto.startDate,
      endDate: createDto.endDate,
      description: createDto.description,
      owner,
      sitter,
    } as Request);
    
    return this.requestRepo.save(request);
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
  async acceptRequest(id: number) {
  const request = await this.requestRepo.findOne({
    where: { id },
  });

  if (!request) {
    throw new NotFoundException(`Request with id ${id} not found`);
  }

  request.status = RequestStatus.ACCEPTED;

  return await this.requestRepo.save(request);
}

  async refuseRequest(id: number) {
  const request = await this.requestRepo.findOne({
    where: { id },
  });

  if (!request) {
    throw new NotFoundException(`Request with id ${id} not found`);
  }

  request.status = RequestStatus.REFUSED;

  return await this.requestRepo.save(request);
}
  /*//cli generated crud entry points, could be helpful
  create(createRequestDto: CreateRequestDto) {
    return 'This action adds a new request';
  }

  findAll() {
    return `This action returns all requests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }*/
}
