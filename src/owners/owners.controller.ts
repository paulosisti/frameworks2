import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnersService } from './owners.service';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    try {
      return await this.ownersService.create(createOwnerDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post(':ownerId/addPokemon')
  async addPokemonToOwner(
    @Param('ownerId') ownerId: string,
    @Body('pokemonId') pokemonId: any,
  ) {
    try {
      return await this.ownersService.addOwner(ownerId, pokemonId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.ownersService.findAll();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.ownersService.findOne(id);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ) {
    try {
      return await this.ownersService.update(id, updateOwnerDto);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.ownersService.remove(id);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Patch(':ownerId/removePokemon')
  async removePokemonFromOwner(
    @Param('ownerId') ownerId: string,
    @Body('pokemonId') pokemonId: string,
  ) {
    try {
      return await this.ownersService.removeOwner(ownerId, pokemonId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
