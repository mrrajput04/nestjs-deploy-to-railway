import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthSerivce {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async findOne(loginDto: LoginDTO):Promise<{accessToken:string}> {
        const user = await this.userService.findOne(loginDto)
        const passwordMatched = await bcrypt.compare(loginDto.password, user.password)
        if (passwordMatched) {
            const payload = {email:user.email, firstname: user.firstName, lastname:user.lastName, userId:user.id}
            return {accessToken:await this.jwtService.sign(payload)}
        }else {
            throw new UnauthorizedException('password does not matched')
        }

    }
}