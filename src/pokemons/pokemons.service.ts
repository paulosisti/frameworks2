import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { GetPokemonsFilterDto } from './dto/get-pokemon-filter.dto';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const createPokemon = new this.pokemonModel(createPokemonDto);
    return await createPokemon.save();
  }

  async findAll() {
    return await this.pokemonModel.find();
  }

  async getPkemonsWithFilters(
    filterDto: GetPokemonsFilterDto,
  ): Promise<Pokemon[]> {
    const { pokemonType } = filterDto;

    let pokemons = await this.pokemonModel.find();

    if (pokemonType) {
      pokemons = pokemons.filter(
        (pokemon) => pokemon.pokemonType === pokemonType,
      );
    }
    return pokemons;
  }

  async findOne(id: string) {
    const pokemon = await this.pokemonModel.findById(
      new mongoose.Types.ObjectId(id),
    );
    if (!pokemon) {
      throw Error(`Ops... Pokemon with id: ${id} not found`);
    }
    return pokemon;
  }

  async findByName(name: string) {
    const pokemon = await this.pokemonModel.find({ name: name });
    if (!pokemon) {
      throw Error(`Ops... Pokemon with name: ${name} not found`);
    }
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.pokemonModel.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      updatePokemonDto,
      { new: true },
    );
    if (!pokemon) {
      throw Error(`Ops... Pokemon with id: ${id} not found`);
    }
    return pokemon;
  }

  async remove(id: string) {
    const deletedPokemon = await this.pokemonModel.findByIdAndDelete({
      _id: id,
    });

    if (!deletedPokemon) {
      throw Error(`Ops... Pokemon with id: ${id} not found`);
    }
    return deletedPokemon;
  }
}
