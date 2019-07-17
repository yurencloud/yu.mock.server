import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty({ description: '商家code' })
  @Column()
  merchantCode: string;

  @ApiModelProperty({ description: '订单开始时间' })
  @Column()
  startTime: Date;

  @ApiModelProperty({ description: '订单结束时间' })
  @Column()
  endTime: Date;

  @ApiModelProperty({ description: 'SKU编码' })
  @Column()
  skuCode: string;

  @ApiModelProperty({ description: '供应商SKU编码' })
  @Column()
  supplierSkuCode: string;

  @ApiModelProperty({ description: '商家订单编号' })
  @Column()
  supplierOrderNo: string;

  @ApiModelProperty({ description: '收件人手机号' })
  @Column()
  mobile: string;

  @ApiModelProperty({ description: '收货人姓名' })
  @Column()
  name: string;

  @ApiModelProperty({ description: '订单标记' })
  @Column()
  star: number;

  @ApiModelProperty({ description: '订单状态' })
  @Column()
  status: number;

  @ApiModelProperty({ description: '用户留言' })
  @Column()
  message: string;

  @ApiModelProperty({ description: '标记内容' })
  @Column()
  remark: string;

  @ApiModelProperty({ description: '发货时间' })
  @Column()
  deliveryTime: Date;

  products: any;
}
