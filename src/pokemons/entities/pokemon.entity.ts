/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema({ timestamps: true })
export class Pokemon {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop({
    type: String,
    enum: [
      'normal',
      'fire',
      'water',
      'grass',
      'flying',
      'fighting',
      'poison',
      'electric',
      'ground',
      'rock',
      'psychic',
      'ice',
      'bug',
      'ghost',
      'steel',
      'dragon',
      'dark',
      'fairy',
    ],
  })
  pokemonType: string;

  @Prop()
  hp: number;

  @Prop()
  attack: number;

  @Prop()
  defense: number;

  @Prop()
  speed: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
