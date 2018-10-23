import {
  Body,
  Catch,
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entity/user.entity';
import { UserRole } from '../../entity/userRole.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
  ) {
  }

  @Get('/test')
  async test(): Promise<any> {
    const data = await this.userRoleRepository
      .createQueryBuilder('user_role')
      .leftJoinAndMapMany('user_role.roles', 'role', 'role', 'role.id = user_role.roleId')
      .where('user_role.userId = :id', { id: 1 })
      .getOne();
    return data;
  }

  @Post('/create')
  async create(@Res() res, @Body() user: User) {
    await this.userService.createUser(user);
    return res.status(HttpStatus.OK).send();
  }

  @Post('/login')
  async login(@Res() res, @Body() body) {
    const token = await this.userService.login(body);
    return res.status(HttpStatus.OK).send(token);
  }
}
