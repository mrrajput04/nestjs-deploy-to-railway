import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from "bcrypt"
import * as speakeasy from "speakeasy"
import { JwtService } from "@nestjs/jwt";
import { ArtistsService } from "src/artists/artists.service";
import { Enable2FAType, PayloadType } from "./types";
import { UpdateResult } from "typeorm";
import { User } from "src/users/user.entity";


@Injectable()
export class AuthSerivce {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private artistService: ArtistsService
    ) { }

    async findOne(loginDto: LoginDTO): Promise<{ accessToken: string } | { validate2FA: string; message: string }> {
        const user = await this.userService.findOne(loginDto)

        const passwordMatched = await bcrypt.compare(loginDto.password, user.password)

        if (passwordMatched) {
            const payload: PayloadType = { email: user.email, userId: user.id }
            const artist = await this.artistService.findArtist(user.id)
            if (artist) {
                payload.artistId = artist.id
            }
            if (user.enable2FA && user.twoFASecret) {
                return {
                    validate2FA: 'http://localhost:3000/auth/validate-2fa',
                    message:
                        'Please sends the one time password/token from your Google Authenticator App',
                };
            }
            return { accessToken: await this.jwtService.sign(payload) }
        } else {
            throw new UnauthorizedException('password does not matched')
        }
    }

    async enable2FA(userId: number): Promise<Enable2FAType> {
        // find the user based on id
        const user = await this.userService.findById(userId);
        // check the status of 2FA if its enable then sent the secret if it's not enabled then generate the secret and return it
        if (user.enable2FA) {
            return { secret: user.twoFASecret }
        }
        const secret = speakeasy.generateSecret()
        user.twoFASecret = secret.base32
        await this.userService.update2FA(userId, user.twoFASecret)
        return { secret: user.twoFASecret }
    }

    async verify2FA(userId: number, token: string): Promise<{ verified: boolean }> {
        try {
            // find the user on the based on id
            const user = await this.userService.findById(userId);

            // extract his 2FA secret
            // verify the secret with token by calling the speakeasy verify method
            const verified = speakeasy.totp.verify({
                secret: user.twoFASecret,
                token: token,
                encoding: 'base32',
            });

            // if validated then sends the json web token in the response
            if (verified) {
                return { verified: true };
            } else {
                return { verified: false };
            }
        } catch (err) {
            throw new UnauthorizedException('Error verifying token');
        }
    }

    async disabled2FA(userId: number): Promise<UpdateResult> {
        return await this.userService.disabled2FA(userId)
    }

    validateApikey(apiKey: string): Promise<User> {
        return this.userService.validateApiKey(apiKey)
    }

}