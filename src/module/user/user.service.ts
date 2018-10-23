import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { validate } from 'class-validator';
import { Logger } from '../../common/log/logger.log';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../../common/guards/token.service';
import { UserRole } from '../../entity/userRole.entity';
import { AppError } from '../../common/error/AppError';
import { AppErrorTypeEnum } from '../../common/error/AppErrorTypeEnum';

@Injectable()
export class UserService implements UserInterface {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
    private readonly log: Logger,
    private readonly tokenService: TokenService,
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async createUser(user: User) {
    // 判断用户是否已经存在
    const findUser = await this.userRepository.findOne({ email: user.email });
    if (findUser) throw new AppError(AppErrorTypeEnum.USER_EXISTS);
    // 密码加密
    user.password = await bcrypt.hash(user.password, 10);
    const result = await this.userRepository.insert(user);
    const userRole = new UserRole();
    userRole.roleId = 2;
    userRole.userId = Number(result.identifiers[0].id);
    await this.userRoleRepository.insert(userRole);
  }

  async login(body: any): Promise<string> {
    // 判断用户是否已经存在
    const findUser = await this.userRepository.findOne({ email: body.email });
    if (findUser) {
      const isSame = bcrypt.compareSync(body.password, findUser.password);
      if (isSame) {
        const data = await this.userRoleRepository
          .createQueryBuilder('user_role')
          .leftJoinAndMapMany('user_role.roles', 'role', 'role', 'role.id = user_role.roleId')
          .where('user_role.userId = :id', { id: findUser.id })
          .getOne();
        const roles: string[] = [];
        // @ts-ignore
        data.roles.forEach(role => roles.push(role.name));
        return this.tokenService.sign({ ...findUser, roles });
      } else {
        throw new AppError(AppErrorTypeEnum.WRONG_EMAIL_OR_PASSWORD);
      }
    } else {
      throw new AppError(AppErrorTypeEnum.WRONG_EMAIL_OR_PASSWORD);
    }
  }
}
