import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { CreateUserDTO } from "../users/dto/create-user-dto";
import { User } from "../users/user.entity";
import { LoginDTO } from "./dto/login.dto";
import { AuthSerivce } from "./auth.service";

@Controller('auth')

export class AuthController {
    constructor(
        private authService: AuthSerivce,
        private userService: UserService) { }
    @Post()
    create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
        return this.userService.create(createUserDTO)
    }

    @Post('login')
    async findOne(@Body() loginDto: LoginDTO){
        const user = await this.authService.findOne(loginDto)
       return user
}

}