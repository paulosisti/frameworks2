import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerDto {
  id?: string;

  @IsString({
    message: '(name) must be a string conforming to the specified constraints',
  })
  @IsNotEmpty({ message: '(name) must not be empty' })
  name: string;

  pokemons: string[];
}
