import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-songs-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-songs-dto';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>
    ) { }
    async create(songDTO: CreateSongDTO): Promise<Song> {
        const song = new Song()
        song.title = songDTO.title;
        song.duration = songDTO.duration;
        song.artists = songDTO.artists;
        song.releasedDate = songDTO.releasedDate;
        song.lyrics = songDTO.lyrics;
        
        //
        const artists = await this.artistRepository.findByIds(songDTO.artists)
        //
        song.artists = artists
        return await this.songRepository.save(song)
    }

    findAll(): Promise<Song[]> {
        return this.songRepository.find()
    }

    findOne(id: number): Promise<Song> {
        return this.songRepository.findOne({where: {id: id}})
    }

    update(id:number, upateSongDto:UpdateSongDTO):Promise<UpdateResult>{
        return this.songRepository.update(id, upateSongDto)
    }

    delete(id: number): Promise<DeleteResult> {
        return this.songRepository.delete(id)
    }

    paginate(options:IPaginationOptions):Promise<Pagination<Song>>{
        const queryBuilder = this.songRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate', 'DESC')
        // return paginate<Song>(this.songRepository, options)
        return paginate<Song>(queryBuilder, options)
    }   

}
