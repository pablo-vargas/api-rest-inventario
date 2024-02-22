import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ItemModule } from './modules/item/item.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth.middleware';
import { DB_CONFIG, JWT_CONFIG } from './shared/config-global';

@Module({
  imports: [
    JwtModule.register(JWT_CONFIG),
    AuthModule,
    ItemModule,
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),

    TypeOrmModule.forRoot(DB_CONFIG)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude({ path: '/auth/signin', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
