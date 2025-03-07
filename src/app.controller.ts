import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @ApiBearerAuth("JWT-auth")
  // @UseGuards(AuthGuard('bearer'))
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request: any
  ) {
    delete request.user.password
    return {
      user: request.user,
      msg: "authenticated with api key"
    }
  }
}
