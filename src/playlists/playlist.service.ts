import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Playlist } from "./playlist.entity";
import { Song } from "src/songs/song.entity";
import { Repository } from "typeorm";
import { CreatePlayListDto } from "./dto/create-playlist.dto";

@Injectable()

export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>,

        @InjectRepository(Song)
        private songRepo: Repository<Song>,

        @InjectRepository(User)
        private userRepo: Repository<User>

    ){}

    async create(playListDTO:CreatePlayListDto):Promise<Playlist>{
        const playlist = new Playlist();
        playlist.name = playListDTO.name

        //songs will be the array of ids that we are getting from the DTO object
        const songs = await this.songRepo.findByIds(playListDTO.songs);
        //set the relation for the songs with the playlist entity
        //playList.songs = songs;

        // A user will be the id or the user we are getting from the request
        // when we implement the user authentication this id will become the loggedIn user id
        const user = await this.userRepo.findOneBy({id: playListDTO.user});
        playlist.user = user;

        return this.playlistRepo.save(playlist)

    }

}