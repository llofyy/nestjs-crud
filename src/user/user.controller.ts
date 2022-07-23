import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from 'src/models/user.model';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Post()
  async create(@Body() { firstname, lastname }: CreateUserDto): Promise<User> {
    const user = await this.userService.create({
      firstname,
      lastname,
    });

    return user;
  }

  @Get(':id')
  async findOne(@Param() { id }: { id: number }): Promise<User> {
    const user = this.userService.findOne(id);
    return user;
  }

  @Put(':id')
  async update(
    @Param() { id }: { id: number },
    @Body() { firstname, lastname }: CreateUserDto,
  ): Promise<{ message: string }> {
    const updateMessage = await this.userService.update(id, {
      firstname,
      lastname,
    });
    return updateMessage;
  }

  @Delete(':id')
  async delete(@Param() { id }: { id: number }): Promise<{ message: string }> {
    const deleteMessage = await this.userService.delete(id);
    return deleteMessage;
  }
}
