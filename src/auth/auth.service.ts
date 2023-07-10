/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import * as admin from 'firebase-admin';
import * as path from 'path';
import { UsersService } from '../users/users.service';
import { CreateFirebaseUserDto } from './create-firebase-user.dto';

const serviceAccount = require(path.resolve('firebaseconfig.json'));

@Injectable()
export class AuthService {
  private readonly firebaseAdmin: admin.app.App;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

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

  async createUserInFirebaseAuth(createFirebaseUserDto: CreateFirebaseUserDto) {
    const userExists = await this.emailExists(createFirebaseUserDto.email);
    if (!userExists) {
      const userRecord = await this.firebaseAdmin.auth().createUser({
        ...createFirebaseUserDto,
      });
      return userRecord;
    } else {
      throw Error(`Ops... User already exists`);
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      await this.firebaseAdmin.auth().getUserByEmail(email);
      // Se não houver exceção, o e-mail existe
      return true;
    } catch (error) {
      // Se ocorrer uma exceção, o e-mail não existe
      return false;
    }
  }
}
