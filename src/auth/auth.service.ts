/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsernamePassword(
      username,
      password,
    );

    if (user.role != 'admin') {
      throw new UnauthorizedException({
        message: 'Only admin users are allowed',
      });
    }

    const IsPasswordValid = compareSync(password, user.password);
    if (!IsPasswordValid) return null;

    return user;
  }

  async login(user) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
