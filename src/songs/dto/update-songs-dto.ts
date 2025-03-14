import { IsArray,  IsDateString, IsMilitaryTime, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDTO {

    @IsString()
    @IsOptional()
    readonly title : string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each:true})
    readonly artists:any;

    @IsOptional()
    @IsDateString()
    readonly releaseDate : Date;

    @IsOptional()
    @IsMilitaryTime()
    readonly duration : Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;

}