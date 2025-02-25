import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-songs-dto';
import { Connection } from 'src/common/constants/connection';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService,
        @Inject('CONNECTION')
        private connection: Connection
    ) { }

    @Post()
    create(@Body() createSongDTO: CreateSongDTO) {
        return this.songsService.create("animal by martin")
    }

    @Get()
    findAll() {
        try {
            return this.songsService.findAll()
        } catch (e) {
            throw new HttpException('server error',HttpStatus.INTERNAL_SERVER_ERROR,{
                cause:e
            })
        }
    }

    @Get(':id')
    findOne(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
        id: number
    ) {
        
        return `songs fetch successfully based on id ${typeof id}`
    }

    @Put(':id')
    update() {
        return 'update song successfully based on id'
    }

    @Delete(':id')
    dekete() {
        return 'delete song successfully based on id'
    }

}
