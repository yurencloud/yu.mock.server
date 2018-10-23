import {
  Body,
  Catch,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { UserService } from './user.service';
import { User } from '../../entity/user.entity';
import { BaseResponse } from '../../dto/base.response';
import { UserRole } from '../../entity/userRole.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entity/role.entity';

@Catch()
@Controller('user')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
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

  @Get('/all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/create')
  async create(@Body() body): Promise<BaseResponse> {
    return await this.userService.createUser(body);
  }

  @Post('/login')
  async login(@Body() body): Promise<BaseResponse> {
    return await this.userService.login(body);
  }
}
