/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import * as admin from 'firebase-admin';
import { firebaseConfig } from 'firebase.config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private firebaseAdmin: admin.app.App;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
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

  async createUserInFirebaseAuth(email: string, password: string) {
    try {
      const userRecord = await this.firebaseAdmin.auth().createUser({
        email,
        password,
        // Outras informações opcionais do usuário
      });
      return userRecord;
    } catch (error) {
      // Trate o erro, se necessário
    }
  }
}
