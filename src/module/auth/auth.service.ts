import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  createToken(user: User) {
    const jwt: JwtPayload = { id: user.id, username: user.username };
    const accessToken = this.jwtService.sign(jwt);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    return {};
  }
}
