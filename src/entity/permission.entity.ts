import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Permission {
  // appId: "APPL2019070811444822900000400000"
  // code: "RESO2019061111162933400003200000"
  // id: 90545
  // name: "启用账号接口"
  // parentCode: null
  // resourceGroupCode: "RESG2019061115181621200005200000"
  // status: 1
  // type: 4
  // updateTime: 1562834591000
  // updateUserCode: null
  // uri: "/merchant/account/enable"

  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty({ description: '商家code' })
  @Column()
  code: string;

  @ApiModelProperty({ description: '资源标识' })
  @Column()
  uri: string;
}
