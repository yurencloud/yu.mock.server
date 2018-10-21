import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { BaseResponse } from '../../dto/base.response';
import { ResponseCode } from '../../constant/response-code';
import { validate } from 'class-validator';
import { Logger } from '../../common/log/logger.log';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../common/config/config.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService implements UserInterface {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly log: Logger,
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async createUser(body: any): Promise<BaseResponse> {
    const user = new User();
    user.username = body.username;
    user.password = body.password;

    validate(user).then(errors => {
      if (errors.length > 0) {
        this.log.error('validation failed. errors: %j', errors);
        return new BaseResponse(ResponseCode.VALIDATION_FAILED, errors);
      } else {
        this.log.info('validation success');
      }
    });

    // 校验用户名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
    if (!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.test(user.username)) {
      return new BaseResponse({
        code: ResponseCode.VALIDATION_FAILED.code,
        msg: 'username must have 5-20 characters and it can include "_","."',
      });
    }

    // 判断用户是否已经存在
    const findUser = await this.userRepository.findOne({ username: user.username });
    if (findUser) {
      return new BaseResponse(ResponseCode.USER_EXISTED);
    }

    // 密码加密
    user.password = await bcrypt.hash(user.password, 10);

    const result = await this.userRepository.insert(user);
    if (!result) {
      this.log.error('database insert errors');
      return new BaseResponse(ResponseCode.FAIL);
    }

    return new BaseResponse(ResponseCode.SUCCESS);
  }

  async login(body: any): Promise<BaseResponse> {
    // 判断用户是否已经存在
    const findUser = await this.userRepository.findOne({ username: body.username });
    if (findUser) {
      const isSame = bcrypt.compareSync(body.password, findUser.password);
      if (isSame) {
        console.log(this.authService.createToken(findUser));
      }
      return new BaseResponse(ResponseCode.SUCCESS);
    } else {
      return new BaseResponse(ResponseCode.LOGIN_FAILED);
    }
  }
}
