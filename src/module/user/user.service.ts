import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { BaseResponse } from '../../dto/base.response';
import { ResponseCode } from '../../constant/response-code';
import { validate } from 'class-validator';
import { Logger } from '../../common/log/logger.log';
import * as crypto from 'crypto-js';

@Injectable()
export class UserService implements UserInterface {
  private readonly users: User[] = [];

  private readonly log: Logger = new Logger();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // TODO:创建用户，验证用户参数，密码加密
  // https://github.com/typestack/class-validator
  public createUser(body: any): BaseResponse {
    const response = new BaseResponse(ResponseCode.SUCCESS.code, ResponseCode.SUCCESS.msg);

    const user = new User();
    user.username = body.username;
    user.nickname = body.nickname;
    user.password = body.password;

    validate(user).then(errors => {
      if (errors.length > 0) {
        this.log.info('validation failed. errors: %j', errors);
        response.code = ResponseCode.VALIDATION_FAILED.code;
        response.msg = ResponseCode.VALIDATION_FAILED.msg;
        response.data = errors;
        return response;
      } else {
        this.log.info('validation success');
      }
    });

    crypto.HmacSHA256();
    const result = this.userRepository.insert(user);
    result.then(data => {
      console.log(data);
    }).catch(e => {
      console.log(e);
      response.code = ResponseCode.FAIL.code;
      response.msg = ResponseCode.FAIL.msg;
    });
    return response;
  }

  private getPasswordEncrypted(password: string): string {
    var bytes = crypto.AES.decrypt(password, this.SECERET_KEY);
    var plaintext = bytes.toString(this.CryptoJS.enc.Utf8);
    return plaintext;
  }
}
