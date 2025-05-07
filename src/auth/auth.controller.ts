import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDocument } from 'src/users/schemas/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: AuthDto): Promise<any> {
    const registeredUser = await this.authService.register(registerDto);
    return this.authService.login(registeredUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserDocument }): Promise<any> {
    return this.authService.login(req.user);
  }
}
