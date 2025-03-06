import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
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
