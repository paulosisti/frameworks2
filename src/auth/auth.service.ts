/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import * as admin from 'firebase-admin';
import * as path from 'path';
import { UsersService } from '../users/users.service';

const serviceAccount = require(path.resolve('firebaseconfig.json'));

@Injectable()
export class AuthService {
  private firebaseAdmin: admin.app.App;

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

  async createUserInFirebaseAuth(email: string, password: string) {
    try {
      // Verificar se o usuário já existe
      const existingUser = await this.firebaseAdmin
        .auth()
        .getUserByEmail(email);
      if (existingUser) {
        throw new Error('Usuário já existe');
      }

      // Criar o novo usuário
      const userRecord = await this.firebaseAdmin.auth().createUser({
        email,
        password,
        // Outras informações opcionais do usuário
      });

      return userRecord;
    } catch (error) {
      // Trate o erro, se necessário
      throw new Error('Erro ao criar usuário no Firebase Auth');
    }
  }
}
