import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { ArtistsService } from "src/artists/artists.service";
import { PayloadType } from "./types";


@Injectable()
export class AuthSerivce {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private artistService: ArtistsService
    ) { }

    async findOne(loginDto: LoginDTO): Promise<{ accessToken: string }> {
        const user = await this.userService.findOne(loginDto)
        const passwordMatched = await bcrypt.compare(loginDto.password, user.password)
        if (passwordMatched) {
            const payload: PayloadType = { email: user.email, userId: user.id }
            const artist = await this.artistService.findArtist(user.id)
            if (artist) {
                payload.artistId = artist.id
            }
            return { accessToken: await this.jwtService.sign(payload) }
        } else {
            throw new UnauthorizedException('password does not matched')
        }

    }
}