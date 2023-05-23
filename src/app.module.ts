import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AppController } from '@root/app.controller';
import { ApiModule } from '@api/api.module';
import { AdminModule } from '@admin/admin.module';
import { AppConfigService } from '@services/app-config/app-config.service';
import config from '@root/config';
import { BaseModule } from '@base/base.module';
import { LocaleMiddleware } from '@root/middleware/locale.middleware';
import { AuthService } from '@services/auth/auth.service';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@services/users/users.service';
import { ApiController } from '@api/api.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthController } from '@modules/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

const appConfig = new AppConfigService(new ConfigService());
const mongoHost = appConfig.get<string>('mongo.host');
const mongoPort = appConfig.get<string>('mongo.port');
const mongoUrlParams = appConfig.get<string>('mongo.urlParams');
const mongoDb = appConfig.get<string>('mongo.db');
const mongoUser = appConfig.get<string>('mongo.user');
const mongoPass = appConfig.get<string>('mongo.pass');
const mongoConnectionString = `mongodb://${mongoHost}:${mongoPort}/${mongoUrlParams}`;

const ormType = appConfig.get<string>('orm.type');
const ormHost = appConfig.get<string>('orm.host');
const ormPort = appConfig.get<string>('orm.port');
const ormUser = appConfig.get<string>('orm.user');
const ormPass = appConfig.get<string>('orm.pass');
const ormDb = appConfig.get<string>('orm.db');

dotenv.config();

if (process?.env.NODE_ENV === 'development' || process?.env.NODE_ENV === 'test') {
  console.log(`MongoDB host: ${mongoHost}`);
  console.log(`MongoDB port: ${mongoPort}`);
  console.log(`MongoDB params: ${mongoUrlParams}`);
  console.log(`MongoDB db: ${mongoDb}`);
  console.log(`MongoDB user: ${mongoUser}`);
  console.log(`MongoDB pass: ${mongoPass}`);
  console.log(mongoConnectionString);

  // console.log(`TypeORM type: ${ormType}`);
  console.log(`TypeORM host: ${ormHost}`);
  console.log(`TypeORM port: ${ormPort}`);
  console.log(`TypeORM user: ${ormUser}`);
  console.log(`TypeORM password: ${ormPass}`);
  console.log(`TypeORM db: ${ormDb}`);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    MongooseModule.forRoot(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: mongoDb,
      user: mongoUser,
      pass: mongoPass,
      family: 4
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: ormHost,
      port: Number(ormPort),
      username: ormUser,
      password: ormPass,
      database: ormDb,
      entities: [],
      synchronize: true,
    }),
    BaseModule,
    ApiModule,
    AdminModule,
    AuthModule,
    UsersModule
  ],
  controllers: [
    ApiController,
    AuthController
  ],
  providers: [
    AuthService,
    UsersService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LocaleMiddleware)
      .forRoutes('api');
  }
}
