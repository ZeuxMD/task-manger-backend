import { IsString, IsNotEmpty, IsEmail, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUrl()
  @IsNotEmpty()
  linkedinProfileUrl: string;

  @IsString()
  name: string;

  @IsString()
  photo: string;
}
