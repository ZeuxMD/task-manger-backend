/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { ScrapingService } from 'src/users/scraping.service';
import { UserDocument } from 'src/users/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private scrapingService: ScrapingService,
  ) {}

  //NOTE: we'll validate with email for now, I might change to use the username after I implement puppeteer
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('This email does not exist');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const { password, ...result } = user.toObject(); // Exclude password from the returned object
    return result;
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      email: user.email,
      photo: user.photo,
    };
  }

  async register(authDto: AuthDto): Promise<any> {
    const existingUser = await this.usersService.findOneByEmail(authDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(authDto.password, 10); // Hash the password
    let linkedinProfileInfo: { name: string; photo: string } = {
      name: authDto.username,
      photo: '',
    };
    if (authDto.linkedinProfileUrl) {
      try {
        linkedinProfileInfo = await this.scrapingService.scrapeLinkedInProfile(
          authDto.linkedinProfileUrl,
        );
      } catch (error) {
        console.error(
          `Failed to scrape LinkedIn profile for ${authDto.email}:`,
          error,
        );
      }
    }
    const user = await this.usersService.create({
      username: linkedinProfileInfo?.name || authDto.username,
      email: authDto.email,
      password: hashedPassword,
      linkedinProfileUrl: authDto.linkedinProfileUrl,
      photo: linkedinProfileInfo?.photo,
    });

    const { password, ...result } = user.toObject(); // Exclude password from the returned object
    return result;
  }
}
