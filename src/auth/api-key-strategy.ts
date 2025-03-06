import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer"
import { AuthSerivce } from "./auth.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthSerivce) {
        super()
    }

    async validate(apiKey: string) {
        const user = await this.authService.validateApikey(apiKey)
        if (!user) {
            throw new UnauthorizedException()
        } else {
            return user
        }
    }
}