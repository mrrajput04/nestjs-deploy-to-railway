import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user-dto";
import { User } from "./user.entity";

@Controller('auth')

export class UserController {
    constructor(private userService: UserService) { }
    @Post()
    create(@Body() createUserDTO: CreateUserDTO): Promise<User>{
        return this.userService.create(createUserDTO)
}
}