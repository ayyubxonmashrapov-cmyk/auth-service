import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { PrismaaModule } from './config/db/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal: true
    }),
    PrismaaModule,
    AuthModule,
  ],
})
export class AppModule {}
  