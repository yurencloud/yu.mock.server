import { decode, sign, verify } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  sign(user: any) {
    return sign(
      {
        id: user.id,
        email: user.email,
        roles: user.roles,
      },
      TokenService.getSecretKey({
        id: user.id,
        email: user.email,
        roles: user.roles,
      }),
      {
        expiresIn: 360000,
      },
    );
  }

  verify(token: string) {
    const data: any = decode(token);
    return verify(token, TokenService.getSecretKey(data));
  }

  decode(token: string) {
    return decode(token);
  }

  static getSecretKey(data: any) {
    return 'secretKey' +
      (data ? (
        '$' + data.id +
        '$' + data.email +
        (data.roles ? data.roles.map(role => '$' + role) : '')
      ) : '');
  }
}
