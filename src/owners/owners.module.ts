import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonsModule } from 'src/pokemons/pokemons.module';
import { Owner, OwnerSchema } from './entities/owner.entity';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
    PokemonsModule,
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
