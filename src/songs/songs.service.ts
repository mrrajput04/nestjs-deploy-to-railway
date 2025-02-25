import { Injectable, Scope } from '@nestjs/common';

@Injectable(
    // {
    //     scope:Scope.TRANSIENT
    // }
)
export class SongsService {

    private readonly songs:Array<string> = [];

    create(song:string){
         this.songs.push(song);
         return this.songs
    }

    findAll(){
        // throw new Error("error while fetching the records from DB")
        return this.songs
    }

}
