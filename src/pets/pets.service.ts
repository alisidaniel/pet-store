import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersService } from '../owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petRepository.create(createPetInput);
    return this.petRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petRepository.findOneOrFail(id);
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
