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

#### 5.debug使用
先创建Attach node or chrome的debug，并监听9229
接着使用npm run start:debug来启动debug，ws会暴露在9229

#### 6.如何使用拦截器？
先把拦截器Interceptors 造好
然后在相应的控制器的类上添加注解
那么在执行之前和执行执行，都会触发拦截器
@UseInterceptors(LoggingInterceptor, TransformInterceptor)

#### 7.jwt使用过程问到的问题
在官方提供的示例中，jwt确实能正常使用，并且也能话request中携带上相应的user信息，但是未找到方法把jwt和role角色
守卫相结合，因为在结合的canActivate中，无法获取用户的信息，就无法检查用户的角色。

所以我便选择了另一个jwt库jsonwebtoken，使用这个库，能像其他语言那样，加密，解密jwt的token,此时就可以把role角色
结合进来了。

#### 8.error异常处理
所有的异常都统计由AppError来创建，并由  app.useGlobalFilters(new HttpExceptionFilter()); 来处理

#### 9.所有的数据验证由管道来验证
app.useGlobalPipes(new ValidationPipe());





















