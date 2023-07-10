import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner, OwnerDocument } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const createOwner = new this.ownerModel(createOwnerDto);
    return await createOwner.save();
  }

  async findAll() {
    return await this.ownerModel.find().populate('pokemons');
  }

  async findOne(id: string) {
    const owner = await this.ownerModel.findById(id).populate('pokemons');
    if (!owner) {
      throw Error(`Ops... Owner with id: ${id} not found`);
    }
    return owner;
  }

  async findByName(name: string) {
    const owner = await this.ownerModel.find({ name: name });
    if (!owner) {
      throw Error(`Ops... Owner with name: ${name} not found`);
    }
    return owner;
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.ownerModel.findByIdAndUpdate(
      { _id: id },
      updateOwnerDto,
      { new: true },
    );
    if (!owner) {
      throw Error(`Ops... Owner with id: ${id} not found`);
    }
    return owner;
  }

  async remove(id: string) {
    const deletedOwner = await this.ownerModel.findByIdAndDelete({
      _id: id,
    });

    if (!deletedOwner) {
      throw Error(`Ops... Owner with id: ${id} not found`);
    }
    return deletedOwner;
  }

  async addOwner(ownerId: string, pokemonId: string) {
    return await this.ownerModel.findByIdAndUpdate(
      ownerId,
      { $addToSet: { pokemons: pokemonId } },
      { new: true },
    );
  }
  removeOwner(ownerId: string, pokemonId: string) {
    return this.ownerModel.findByIdAndUpdate(
      ownerId,
      { $pull: { pokemons: pokemonId } },
      { new: true },
    );
  }
  async getOwners(pokemonId: string) {
    const owner = await this.ownerModel
      .findById(pokemonId)
      .populate('pokemons');
    return owner.pokemons;
  }
}
