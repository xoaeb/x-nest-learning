import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
// import { AuthGuard } from './auth.guard';
// import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './stratergies/local.stratergy';
import { JwtStrategy } from './stratergies/jwt.straterfy';
import { JwtAuthGuard } from './stratergies/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

console.log(jwtConstants.secret);
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
    }),
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
