import {
  Body,
  Controller,
  Post,
  Res,
  Param,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../entity/user.entity';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { BaseResp } from '../../bean/respone/BaseResp';
import { BaseResult } from '../../bean/respone/BaseResult';
import { LoginReq } from '../../bean/request/LoginReq';
import { BasePageReq } from '../../bean/request/BasePageReq';
import { BasePageResp } from '../../bean/respone/BasePageResp';
import { AppError } from '../../common/error/AppError';
import { AppErrorTypeEnum } from '../../common/error/AppErrorTypeEnum';
import { UserRole } from '../../entity/userRole.entity';
import { Merchant } from '../../entity/merchant.entity';
import { Permission } from '../../entity/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from '../../common/guards/token.service';

@ApiUseTags('user')
@Controller('/merchant-gw/merchant/user')
export class UserController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(Merchant) private readonly merchantRepository: Repository<Merchant>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    private readonly tokenService: TokenService,
  ) {
  }

  @ApiOperation({ title: '创建用户' })
  @Post('/create')
  async create(@Res() res, @Body() user: User) {
    // 判断用户是否已经存在
    const findUser = await this.userRepository.findOne({ account: user.account });
    if (findUser) throw new AppError(AppErrorTypeEnum.USER_EXISTS);
    // 密码加密
    user.password = await bcrypt.hash(user.password, 10);
    const result = await this.userRepository.insert(user);
    const userRole = new UserRole();
    userRole.roleId = 2;
    userRole.userId = Number(result.identifiers[0].id);
    await this.userRoleRepository.insert(userRole);
    return res.status(HttpStatus.OK).send(new BaseResp());
  }

  @ApiOperation({ title: '用户登录' })
  @Post('/accountLogin')
  async login(@Res() res, @Body() user: LoginReq) {
    // 判断用户是否已经存在
    const findUser = await this.userRepository.findOne({ account: user.accountName });
    if (findUser) {
      const isSame = bcrypt.compareSync(user.password, findUser.password);
      if (isSame) {
        const data = await this.userRoleRepository
          .createQueryBuilder('user_role')
          .leftJoinAndMapMany('user_role.roles', 'role', 'role', 'role.id = user_role.roleId')
          .where('user_role.userId = :id', { id: findUser.id })
          .getOne();
        const roles: string[] = [];
        data.roles.forEach(role => roles.push(role.name));
        const token = this.tokenService.sign({ ...findUser, roles });
        return res.status(HttpStatus.OK).send(new BaseResult({ account: findUser, token }));
      } else {
        throw new AppError(AppErrorTypeEnum.WRONG_EMAIL_OR_PASSWORD);
      }
    } else {
      throw new AppError(AppErrorTypeEnum.WRONG_EMAIL_OR_PASSWORD);
    }
  }

  @ApiOperation({ title: '获取商家列表' })
  @Post('/page/manager/merchants')
  async managerMerchants(@Res() res, @Body() req: BasePageReq) {
    const data = await this.merchantRepository
      .createQueryBuilder('merchant')
      .where('code = :code', { code: 'SGSJ000145' })
      .skip((req.page - 1) * 10)
      .take(req.pageSize)
      .getManyAndCount();

    return res.status(HttpStatus.OK).send(new BaseResult(new BasePageResp(data[0], data[1], req)));
  }

  @ApiOperation({ title: '获取用户权限' })
  @Get('/merchant/privilege/resources')
  async getUserPermission(@Res() res, @Request() req) {
    const data = await this.permissionRepository
      .createQueryBuilder('permission')
      .where('code = :code', { code: req.query.merchantCode })
      .getMany();

    return res.status(HttpStatus.OK).send(new BaseResult(data));
  }
}
