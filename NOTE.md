#### 1. controller,service,modules,controller.spec的关系
controller对外提供接口，service给controller提供服务，controller不进行任何业务逻辑处理。
modules就相当于1个容器，包装controller和service，然后给app.module引用。
controller.spec为单元测试。


#### 2.controller,service,modules等如何生效，如果被程序引入并执行
main.ts只引入了AppModule
```
const app = await NestFactory.create(AppModule);
```
所以在AppModule中引入模块，就能被主程序引入并执行，否则就不能被执行
```
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CatsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
```

#### 3.tslint async报错解决方法
加上这个参数，并把exclude中的spec这行删除
```
  "compilerOptions": {
    "lib": [ "es2015" ],
    }
```

#### 4.tslint修改建议
```
    "promise-function-async": [
      false
    ],
    "no-trailing-whitespace": false
```

#### 4.log日志模块使用
```
private readonly log: Logger = new Logger();

this.log.error('error')
```

log4js配置中的file和dateFile，file是根据日志文件大小重新创建新日志，而dateFile是根据日志文件日期来重新创建，二者选其一就可以

占位符，是使用node的format,比如%s, %d等，[参考这](https://nodejs.org/api/util.html#util_util_format_format_args)
