import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://paulo1234:paulo1234@sisticluster.rsm8agc.mongodb.net/test',
    ),
    UsersModule,
    AuthModule,
    PokemonsModule,
    OwnersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
