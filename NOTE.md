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
