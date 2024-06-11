import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { hashPassword } from 'src/utils/hashPassword';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  public async create(payload: CreateUserDto): Promise<UserEntity> {
    payload.password = await hashPassword(payload.password)
    const newUser = new UserEntity()
    Object.assign(newUser, payload)

    const createdUser = await this.prisma.user.create({ data: newUser });

    return plainToInstance(UserEntity, createdUser)
  }
  
  public async findAll() {
    const users = await this.prisma.user.findMany();
    return plainToInstance(UserEntity, users)
  }

  public async findOne(id: string, tokenUserId: string) {

    if(id !== tokenUserId) {
      throw new ForbiddenException("You don't have permission to perform this action")
    }

    const foundUser = await this.prisma.user.findUnique({
      where: {id}
    })

    if(!foundUser){
      throw new NotFoundException("User not found")
    }

    return plainToInstance(UserEntity, foundUser);
  }

  public async update(id: string, payload: UpdateUserDto, tokenUserId: string) {
    const foundUser = await this.findOne(id, tokenUserId)

    const updateUser = await this.prisma.user.update({
      where: {id: foundUser.id},
      data: payload
    })
    
    return plainToInstance(UserEntity, updateUser);
  }

  public async remove(id: string, tokenUserId: string) {
    await this.findOne(id, tokenUserId)

    await this.prisma.user.delete({where: {id}})
  }
}
