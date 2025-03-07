import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { CreateUserDTO } from "../users/dto/create-user-dto";
import { User } from "../users/user.entity";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Enable2FAType, ValidateTokenType } from "./types";
import { JwtAuthGuard } from "./auth.guard";
import { UpdateResult } from "typeorm";

@Controller('auth')

export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService) { }
    @Post()
    create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
        return this.userService.create(createUserDTO)
    }

    @Post('login')
    async findOne(@Body() loginDto: LoginDTO) {
        const user = await this.authService.findOne(loginDto)
        return user
    }

    @Get('enable-2fa')
    @UseGuards(JwtAuthGuard)
    enable2fa(@Req() request: any): Promise<Enable2FAType> {
        return this.authService.enable2FA(request.user.userId)
    }

    @Post('validate-2FA')
    @UseGuards(JwtAuthGuard)
    validate2FA(@Req() request: any,@Body()  ValidateTokenType: ValidateTokenType): Promise<{ verified: boolean }> {
        return this.authService.verify2FA(request.user.userId, ValidateTokenType.token)
    }

    @Get('disable-2fa')
    @UseGuards(JwtAuthGuard)
    disable2FA(@Req() request:any): Promise<UpdateResult> {
        return this.authService.disabled2FA(request.user.userId)
    }

    @Get('test')
    testEnv():Promise<number>{
        return this.authService.loadEnv()
    }

}