import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    default: 'Ryan',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public firstName: string;

  @ApiProperty({ description: 'Sobrenome do usuário', default: 'Taylor' })
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({ description: 'Email do usuário', default: 'ryan@hotmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({ description: 'Senha do usuario', default: 'dsafasjdfççkj' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;
}
