import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

// we can do profile operations here, like getting profile info or updating it
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get('profile')
  async getProfile(
    @Request() req: { user: { userId: string; email: string } },
  ) {
    const userData = await this.usersService.findOneById(req.user.userId);
    return {
      username: userData?.username,
      email: userData?.email,
      photo: userData?.photo,
    };
  }
}
