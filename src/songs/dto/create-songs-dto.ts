import { IsArray, isArray, IsDateString, isDateString, IsMilitaryTime, isMilitaryTime, IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";

export class CreateSongDTO {

    @IsString()
    @IsNotEmpty()
    readonly title : string;

    @IsNotEmpty()
    @IsArray()
    @IsString()
    readonly artists : string[];

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate : Date;

    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration : Date;

}