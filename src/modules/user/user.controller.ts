import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtLoginGuard } from '../login/jwt.login.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  public async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtLoginGuard)
  public async findOne(@Param('id') id: string, @Req() req: any) {
    
    return await this.userService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtLoginGuard)
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    return await this.userService.update(id, updateUserDto, req.user.id);
  }

  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JwtLoginGuard)
  public async remove(@Param('id') id: string, @Req() req: any) {
    return await this.userService.remove(id, req.user.id);
  }
}
