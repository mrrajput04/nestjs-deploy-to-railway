import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstant } from "./auth.constant";
import { Injectable } from "@nestjs/common";
import { PayloadType } from "./types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET
        });
    }

    async validate(payload: PayloadType) {
        return { userId: payload.userId, email: payload.email, artistId:payload.artistId }
    }
}