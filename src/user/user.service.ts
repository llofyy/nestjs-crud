import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async create({ firstname, lastname }: CreateUserDto): Promise<User> {
    const userExist = await this.userRepository.findOne({
      where: {
        firstName: firstname,
        lastName: lastname,
      },
    });

    if (userExist) throw new HttpException('Usuário já cadastrado', 400);

    const user = this.userRepository.create({
      firstName: firstname,
      lastName: lastname,
    });

    await this.userRepository.save(user);

    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new HttpException(`Usuário #${id} não existe.`, 404);

    return user;
  }

  async update(
    id: number,
    { firstname, lastname }: CreateUserDto,
  ): Promise<{ message: string }> {
    const userExist = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userExist) throw new HttpException('Usuário não existe', 404);

    await this.userRepository.update(id, {
      firstName: firstname,
      lastName: lastname,
    });

    return {
      message: `Usuário #${id} atualizado com sucesso!`,
    };
  }

  async delete(id: number): Promise<{ message: string }> {
    const userExist = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userExist) throw new HttpException('Usuário não existe', 404);

    await this.userRepository.delete(id);

    return {
      message: `Usuário #${id} removido com sucesso.`,
    };
  }
}
