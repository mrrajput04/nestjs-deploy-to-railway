import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user-dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(createUserDTO: CreateUserDTO): Promise<User> {
        const user = new User()
        user.firstName = createUserDTO.firstName;
        user.lastName = createUserDTO.lastName;
        user.email = createUserDTO.email;
        user.password = await bcrypt.hash(createUserDTO.password, 10);
        return this.userRepository.save(user)
    }
}
