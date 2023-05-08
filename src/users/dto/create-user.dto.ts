import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id?: string;

  @IsString({
    message:
      '(username) must be a string conforming to the specified constraints',
  })
  @IsNotEmpty({ message: '(username) must not be empty' })
  username: string;

  @IsString({
    message:
      '(password) must be a string conforming to the specified constraints',
  })
  @IsNotEmpty({ message: '(password) must not be empty' })
  password: string;

  role?: string;
}
