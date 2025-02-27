import { Module } from '@nestjs/common';
import { Song } from 'src/songs/song.entity';
import { Playlist } from './playlist.entity';
import { User } from 'src/users/user.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
    controllers: [PlaylistController],
    providers: [PlaylistService],
})
export class PlaylistModule {}
