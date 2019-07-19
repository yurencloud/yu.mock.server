## Mock Server 前端Mock接口和数据方案

#### 前言
> Mocker Server的解释：就是前端直接创建一个后端服务，简单的实现业务接口逻辑以及从数据库中返回模拟数据。


传统Mock 和 Mock Server的对比

项目 | 传统Mock | Mock Server
---|---| ---
HTTP请求 | 不请求 | 发起真实请求
分页数据 | 不能，造假数据麻烦，难以实现换页 | 能，轻松分页，数据来源真实数据库
创建逻辑 | 不能 | 能，直接插入数据库
编辑逻辑 | 不能 | 能，直接修改数据库中的数据
删除逻辑 | 不能 | 能，直接删除数据库中的数据
查询逻辑 | 不能，先造假分页数据，再模拟筛选条件结果，浪费时间 | 能，直接查询数据库中的数据

名词解释

名词 | 解释
---|---
SERVER | 下文中提到的`SERVER`均指通过[nestjs](https://github.com/nestjs/nest), [typeorm](https://www.jianshu.com/p/1c4650e3718a),mysql搭建的mock后端服务。当然使用其他后端方案 php laravel，java spring boot, go beego，node express 也是可以的。
UI | 下文中提到的`UI`均指通过vue,react搭建的前端项目
DATABASE | 下文中提到的`DATABASE`均指mysql


#### 一、使用场景及流程

##### 场景一

 接口文档 | 后端接口
---|---
 无 | 无

- `UI`按原型完成页面开发
- `SERVER`根据原型创建数据实体类
- `DATABASE`自动生成数据表mysql
- `SERVER`在控制器中完成增删改查接口（自定义接口URL）
- `UI`调用mock接口，获取数据

##### 场景二

 接口文档 | 后端接口
---|---
 有 | 无

- `UI`按原型完成页面开发
- `SERVER`根据接口文档创建数据实体类
- `DATABASE`自动生成数据表mysql
- `SERVER`在控制器中完成增删改查接口（按接口文档定义接口URL）
- `UI`调用mock接口，获取数据

##### 场景三

 接口文档 | 后端接口
---|---
 有 | 有，部分

按场景二，创建没有的那部分的mock接口，部分调用mock接口。

##### 场景四

 接口文档 | 后端接口
---|---
 有 | 有，全部

不使用mock

#### <a name="4">二、运行 Mock Server Demo 示例</a>
##### 1. 克隆示例代码,到本地
```shell
git clone xxxx
```

##### 2. 安装依赖
```shell
npm install
```

##### 3. 修改数据库配置
复制`ormconfig.json.example`，并重命名为`ormconfig.json`,然后编辑`ormconfig.json`
```shell
cp ormconfig.json.example ormconfig.json
vi ormconfig.json
```
```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "secret",
  "database": "blog",
  "entities": ["src/**/**.entity{.ts,.js}"],
  "synchronize": true
}
```
##### 4. 启动项目
每次启动，都会根据`/src/entity/`下的实体类，自动创建或更新mysql数据表
``` shell
npm run dev
```
修改代码后，会自动热更新

##### 5. 插入部分初始化数据
根目录下有数据初始化脚本 `data.sql`

##### 6. 至此已经启动Mock Server
访问`http://localhost:3000/swagger-ui.html`,可查看Mock Server的mock接口文档

#### 三、详细使用教程

> 以下流程以商家中心，登录、商家订单列表、搜索订单、账号列表、创建账号、编辑账号、删除账号功能为例。

##### 项目开始阶段

接口文档 | 后端接口
---|---
 无 | 无

先根据原型完成所有页面的开发。页面开发需要一定时间，==在这时间内，后端可能会给出部分或全部接口文档==。
> 在有接口文档的情况下，mock数据更加真实，并且当后端接口开发完成后，从mock环境切换到真实环境的改动量也会比较少。

假设所有页面已经开发完毕，没有任何接口文档。
我们则按以下4个步骤开发Mock接口
- `SERVER`根据原型创建数据实体类
- `DATABASE`自动生成数据表mysql
- `SERVER`在控制器中完成增删改查接口（自定义接口URL）
- `UI`调用mock接口，获取数据

目标：mock 获取商家订单列表分页接口

##### 1.1 `SERVER`根据原型创建数据实体类  
在`SERVER`中创建Order实体类。因为当前还没有得到接口文档，所以根据原型自行命名字段。如果有接口文档，则按接口文档命名字段。 

src/entity/order.entity.ts
```typescript
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

```
创建完成之后，`SERVER`会自动在mysql中插入order表。

##### 1.2. `SERVER`在控制器中完成增删改查接口（自定义接口URL）
先创建order模块和控制器，并在app.module.ts中引入order模块。

控制器 src/module/order/order.controller.ts
```typescript
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
      .createQueryBuilder('order')
      .where('merchantCode = :code ', { code: 'SGSJ000145' })
      .skip((req.query.page - 1) * req.query.pageSize)
      .take(req.query.pageSize)
      .getManyAndCount();

    return res.status(HttpStatus.OK).send(new BaseResult(new BasePageResp(data[0], data[1], req.query)));
  }
}

```
模块 src/module/order/order.module.ts
```typescript
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '../../common/log/logger.log';
import { Order } from '../../entity/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [Logger],
})

export class OrderModule {
}
```
在`app.module.ts`中引入`order.module.ts`

/src/app.module.ts
```typescript
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from './common/config/config.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { OrderModule } from './module/order/order.module';
import { CommonModule } from './module/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    OrderModule,
    ConfigModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

```

##### 1.3 `UI`调用mock接口，获取数据  
通过上面1.2，已经创建了一个mock 获取商家订单列表分页接口。


那如何调用此接口呢？

调用mock接口的两种方式
1. 全局调用mock接口

在vue.config.js中添加配置
```javascript
    devServer: {
        port: 1025,
        proxy: {
            '/merchant-mock': {
                target: 'http://localhost:3000', // mock环境
                changeOrigin: true,
            },
        },
    },
```

2. 以真实接口为主，部分调用mock接口
```javascript
    devServer: {
        port: 1025,
        proxy: {
            '/merchant-gw/mock': {
                target: 'http://localhost:3000', // mock环境
                changeOrigin: true,
                pathRewrite: {
                    '^/merchant-gw/mock': '/merchant-mock',
                },
            },
            '/merchant-gw': {
                target: 'https://test2sop.sharegoodsmall.com', // 真实环境
                changeOrigin: true,
            },
        },
    },
```
使用时，请在接口处添加配置`mockServer: true`
```javascript
const getOrders = {
    url: '/merchant/order/list',
    method: 'get',
    mockServer: true,
}
```
至此mock就完成了，你只要在数据库中添加几条假的订单数据，就能通过mock接口获取数据。


### 四、进阶用法

##### 1. 如何造数据？
1.1 直接sql插入
```sql
insert into `product` (id, productImage, productName, tag, info, price)
values
  (1, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '华为手机', '售后中', '内存：64G', 6000.00),
  (2, 'http://www.yurencloud.com/_nuxt/img/avatar.902cc14.png', '苹果手机', '售后中', '内存：64G', 6000.00);
```
1.2 通过orm批量插入

为了让数据更真实，可以使用mockjs
```typescript
  @ApiOperation({ title: '生成1万条订单' })
  @Get('/create')
  async orderCreate() {
    for (let i = 0; i < 10000; i++) {
      const order = new Order();
      order.startTime = new Date();
      order.name = Mock.mock('@cname');
      order.message = Mock.mock('@csentence(3, 5)');
      order.remark = Mock.mock('@csentence');
      order.deliveryTime = new Date();
      await this.orderRepository.insert(order);
    }

    return res.status(HttpStatus.OK).send();
  }
```

1.3 不使用数据库，直接返回json数据

可以使用mockjs
```typescript
  @ApiOperation({ title: '获取1条订单信息' })
  @Get('/create')
  async orderCreate() {
    const order = new Order();
    order.name = Mock.mock('@cname');
      
    return res.status(HttpStatus.OK).send(order);
  }
```

##### 2. 如何处理数据级联，多表数据，一对多，多对多数据问题？

> 我们始终要记住，我们是在mock数据，并非要实现后端逻辑。一切以怎么快速和方便来操作。

2.1 扁平化所有数据  

1条订单数据，可能要关联，订单地址表，用户表，产品表等等多表关联。但对于我们mock数据而言，所有数据放在一张表里就可以！

2.2 适时的简化逻辑，造假数据  

1条订单中，包含2个商品的购买，那么，一张表就无法获取1条订单和该订单下的2个商品。
此时，我们只能再创建一个订单商品表，一对多--一条订单对应多条订单商品。
如果订单商品并不重要，只是展示用，那么我们可以取巧,获取订单列表后，遍历，插入订单商品信息。这样就省去创建订单商品表，省去一对多查询逻辑！
```typescript
    const data = await this.orderRepository
      .createQueryBuilder('order')
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
```

##### 3. 当你已经写好mock接口，后端又给出接口文档或可调用的接口

3.1 差异不大或不多
使用mock适配器，将数据修改成和后端一致。  
`yu.to`的使用方法，请参考链接：https://github.com/yurencloud/yu.to

```javascript
const to = require('yu.to')

const getOrders = {
    url: '/merchant/order/list',
    method: 'get',
    mockServer: true,
    mockAdapter: function (res) {
        to(res.data, {
            status: 'copy:productStatus',
        })
        return res
    },
}
```
备注：经过mock适配器处理数据后，还会继续走正常数据的适配器，所以mock适配器应该以调整数据，达到和生产数据结构一致，而不要额外的处理数据。

3.2 差异很大或完全不同，适配工作量大，则重写mock接口，或弃用mock接口

##### 4. 多人合作开发，共享mock接口
4.1 各自拉取和同步mock server代码，共用一个数据库，共用一个oss文件上传接口 

