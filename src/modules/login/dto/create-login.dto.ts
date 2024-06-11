import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
