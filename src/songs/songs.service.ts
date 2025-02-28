import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-songs-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
        constructor(
            @InjectRepository(Song)
            private songRepository: Repository<Song>
        ) { }
   async create(songDTO: CreateSongDTO): Promise<Song> {
        const song = new Song()
        song.title = songDTO.title;
        song.duration = songDTO.duration;
        song.artists = songDTO.artists;
        song.releasedDate = songDTO.releasedDate;
        song.lyrics = songDTO.lyrics;

        return await this.songRepository.save(song)
    }

    findAll(): Promise<Song[]> {
        // throw new Error("error while fetching the records from DB")
        return this.songRepository.find()
    }

    delete(id:number): Promise<DeleteResult> {
        return this.songRepository.delete(id)
    }

}
