import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePokemonDto {
  id?: string;

  @IsString({
    message: '(name) must be a string conforming to the specified constraints',
  })
  @IsNotEmpty({ message: '(name) must not be empty' })
  name: string;

  @IsString({
    message:
      '(pokemonType) must be a string conforming to the specified constraints',
  })
  @IsNotEmpty({ message: '(pokemonType) must not be empty' })
  pokemonType: string;

  @IsNumber()
  @IsNotEmpty({ message: '(hp) must not be empty' })
  hp: number;

  @IsNumber()
  @IsNotEmpty({ message: '(attack) must not be empty' })
  attack: number;

  @IsNumber()
  @IsNotEmpty({ message: '(defense) must not be empty' })
  defense: number;

  @IsNumber()
  @IsNotEmpty({ message: '(speed) must not be empty' })
  speed: number;
}
