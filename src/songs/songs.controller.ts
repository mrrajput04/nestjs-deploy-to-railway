import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-songs-dto';
import { Song } from './song.entity';
import { DeleteResult } from 'typeorm';

@Controller('songs'
    //     {
    //     path:"songs",
    //     scope:Scope.REQUEST
    // }
)
export class SongsController {
    constructor(private songsService: SongsService,
        // @Inject('CONNECTION')
        // private connection: Connection
    ) { }

    @Post()
    create(@Body() createSongDTO: CreateSongDTO):Promise<Song> {
        return this.songsService.create(createSongDTO)
    }

    @Get()
    findAll() {
        try {
            return this.songsService.findAll()
        } catch (e) {
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: e
            })
        }
    }

    @Get(':id')
    findOne(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        id: number
    ) {

        return `songs fetch successfully based on id ${typeof id}`
    }

    @Put(':id')
    update() {
        return 'update song successfully based on id'
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number):Promise<DeleteResult> {
        return this.songsService.delete(id)
    }

}
