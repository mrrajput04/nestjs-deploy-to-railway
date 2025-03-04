import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDTO {      
        @IsOptional()
        @IsString()
        firstName: string;
      
        @IsOptional()
        @IsString()
        lastName: string;
      
        @IsOptional()
        @IsEmail()
        email: string;
      
        @IsOptional()
        @IsString()
        password: string;
}