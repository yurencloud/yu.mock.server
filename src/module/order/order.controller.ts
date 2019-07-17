import { Controller, Get, Res, Request, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entity/order.entity';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { BaseResult } from '../../bean/respone/BaseResult';
import { BasePageResp } from '../../bean/respone/BasePageResp';
import * as Mock from 'mockjs';

@ApiUseTags('订单管理')
@Controller('merchant-mock/merchant/order')
export class OrderController {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) {
  }

  @ApiOperation({ title: '生成订单' })
  @Get('/create')
  async orderCreate(@Res() res, @Request() req) {
    for (let i = 5; i < 20; i++) {
      const order = new Order();
      order.startTime = new Date();
      order.endTime = new Date();
      order.merchantCode = 'SGSJ000145';
      order.skuCode = 'SKU002';
      order.supplierSkuCode = 'SSC002';
      order.supplierOrderNo = 'NO000' + i;
      order.mobile = '15757130092';
      order.name = Mock.mock('@cname');
      order.star = 1;
      order.status = 1;
      order.message = Mock.mock('@csentence(3, 5)');
      order.remark = Mock.mock('@csentence');
      order.deliveryTime = new Date();
      await this.orderRepository.insert(order);
    }

    return res.status(HttpStatus.OK).send();
  }

  @ApiOperation({ title: '获取商家订单分页' })
  @Get('/list')
  async getUserPermission(@Res() res, @Request() req) {
    // 拼接请求参数
    const sql = this.getQueryParam(req.query, ['skuCode', 'mobile']);

    const data = await this.orderRepository
      .createQueryBuilder('permission')
      .where('merchantCode = :code ' + sql, { ...req.query, code: 'SGSJ000145' })
      .skip((req.query.page - 1) * req.query.pageSize)
      .take(req.query.pageSize)
      .getManyAndCount();

    data[0].forEach((order) => {
      order.products = [{
        productImage: 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png',
        productName: '华为手机',
        status: '售后中',
        tag: '内存：64G',
        price: 6000.00,
        amount: 1,
      }];
    });

    return res.status(HttpStatus.OK).send(new BaseResult(new BasePageResp(data[0], data[1], req.query)));
  }

  getQueryParam(query: any, params: string[]) {
    let sql = '';
    params.forEach((item) => {
      if (typeof query[item] !== 'undefined') {
        sql += ' and ' + item + '= :' + item;
      }
    });
    return sql;
  }
}
