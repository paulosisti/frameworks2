import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetPokemonsFilterDto } from './dto/get-pokemon-filter.dto';
import { Pokemon } from './entities/pokemon.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    try {
      return await this.pokemonsService.create(createPokemonDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query() filterDto: GetPokemonsFilterDto): Promise<Pokemon[]> {
    if (Object.keys(filterDto).length) {
      return await this.pokemonsService.getPkemonsWithFilters(filterDto);
    } else {
      return await this.pokemonsService.findAll();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.pokemonsService.findOne(id);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    try {
      return await this.pokemonsService.update(id, updatePokemonDto);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.pokemonsService.remove(id);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
