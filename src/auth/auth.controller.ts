import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateFirebaseUserDto } from './create-firebase-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('auth/users')
  async createUser(@Body() createFirebaseUserDto: CreateFirebaseUserDto) {
    const { email, password } = createFirebaseUserDto;
    return await this.authService.createUserInFirebaseAuth(email, password);
  }
}
