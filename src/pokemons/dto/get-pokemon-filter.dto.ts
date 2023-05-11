/* eslint-disable prettier/prettier */
import { Pokemon } from '../entities/pokemon.entity';

export class GetPokemonsFilterDto {
  pokemonType: Pokemon['pokemonType'];
}
