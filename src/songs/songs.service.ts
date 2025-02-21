import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {

    private readonly songs:Array<string> = [];

    create(song:string){
         this.songs.push(song);
         return this.songs
    }

    findAll(){
        return this.songs
    }

}
