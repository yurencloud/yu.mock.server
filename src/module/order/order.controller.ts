import { Controller, Get, Res, Request, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entity/order.entity';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { BaseResult } from '../../bean/respone/BaseResult';
import { BasePageResp } from '../../bean/respone/BasePageResp';

@ApiUseTags('订单管理')
@Controller('merchant-mock/merchant/order')
export class OrderController {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) {
  }

  @ApiOperation({ title: '获取商家订单分页' })
  @Get('/list')
  async getUserPermission(@Res() res, @Request() req) {
    const data = await this.orderRepository
      .createQueryBuilder('permission')
      .where('merchantCode = :code', { ...req.query, code: 'SGSJ000145' })
      .skip((req.query.page - 1) * 10)
      .take(req.query.pageSize)
      .getManyAndCount();

    return res.status(HttpStatus.OK).send(new BaseResult(new BasePageResp(data[0], data[1], req)));
  }
}
