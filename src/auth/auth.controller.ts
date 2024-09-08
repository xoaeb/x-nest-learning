import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';
// import { SkipAuth } from './constants';
import { LocalAuthGuard } from './stratergies/local-auth-guard';
import { JwtAuthGuard } from './stratergies/jwt-auth.guard';
import { SkipAuth } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @HttpCode(HttpStatus.OK)
  // @SkipAuth()
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {

  //   return this.authService.signIn(signInDto.username, signInDto.password);
  //   //hello
  // }
  @UseGuards(JwtAuthGuard)

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
