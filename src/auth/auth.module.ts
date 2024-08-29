import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

console.log(jwtConstants.secret)
@Module({
  imports: [UserModule, 
    JwtModule.register({
      global: true,
     
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],

})
export class AuthModule {}
