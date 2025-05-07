import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsUrl()
  linkedinProfileUrl: string;
}
