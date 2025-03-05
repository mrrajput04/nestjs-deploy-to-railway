import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user-dto";
import * as bcrypt from 'bcrypt';
import { LoginDTO } from "src/auth/dto/login.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(createUserDTO: CreateUserDTO): Promise<User> {
        const salt = await bcrypt.genSalt()
        createUserDTO.password = await bcrypt.hash(createUserDTO.password, salt);
        const user = await this.userRepository.save(createUserDTO)
        delete user.password
        return user
    }

    async findOne(data:LoginDTO):Promise<User>{
      const user = await this.userRepository.findOneBy({email:data.email})
      if(!user){
        throw new UnauthorizedException("could not found user")
      }
      return user

    }

}
