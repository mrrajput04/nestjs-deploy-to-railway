import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository, UpdateResult } from "typeorm";
import { CreateUserDTO } from "./dto/create-user-dto";
import * as bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid'
import { LoginDTO } from "src/auth/dto/login.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt()
    const users = new User();
    users.firstName = createUserDTO.firstName;
    users.lastName = createUserDTO.lastName;
    users.apiKey = uuid();
    users.email = createUserDTO.email; 
    const hashedPassword = await bcrypt.hash(createUserDTO.password, salt);
    users.password = hashedPassword;
    const user = await this.userRepository.save(users)
    delete user.password
    return user
  }

  async findOne(data: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email })
    if (!user) {
      throw new UnauthorizedException("could not found user")
    }
    return user
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id })
    if (!user) {
      throw new UnauthorizedException("could not found user")
    }
    return user
  }

  async update2FA(id: number, secret: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { twoFASecret: secret, enable2FA: true })
  }

   disabled2FA(userId: number): Promise<UpdateResult> {
    return  this.userRepository.update(userId, {  enable2FA: false })
  }

  validateApiKey(apiKey:string): Promise<User> {
    return  this.userRepository.findOneBy({apiKey})
  }

}
