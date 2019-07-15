import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Merchant {
  // code: "SGSJ000145"
  // id: 112
  // merchantAppId: "APPL2019070811444822900000400000"
  // name: "小王1"
  // status: 1
  // type: 2

  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty({ description: '商家code' })
  @Column()
  code: string;

  @ApiModelProperty({ description: '商家app id' })
  @Column()
  merchantAppId: string;

  @ApiModelProperty({ description: '商家名称' })
  @Column()
  name: string;

  @ApiModelProperty({ description: '状态 0 不正常 1 正常' })
  @Column()
  status: number;

  @ApiModelProperty({ description: '状态 2 联营 1 自营' })
  @Column()
  type: number;
}
