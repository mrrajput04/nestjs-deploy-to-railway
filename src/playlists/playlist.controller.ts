import { Body, Controller, Post } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { CreatePlayListDto } from "./dto/create-playlist.dto";
import { Playlist } from "./playlist.entity";

@Controller('playlist')
export class PlaylistController {
    constructor(private playlistService:PlaylistService){}

    @Post()
    create(
        @Body()
        playlistDTO:CreatePlayListDto,
    ): Promise<Playlist> {
        return this.playlistService.create(playlistDTO)
    }
}