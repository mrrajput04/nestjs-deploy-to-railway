import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Req, Scope, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-songs-dto';
import { Song } from './song.entity';
import { DeleteResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-songs-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artistJwtGuard';
import { PayloadType } from 'src/auth/types';

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
    @UseGuards(ArtistJwtGuard)
    create(@Body() createSongDTO: CreateSongDTO,  @Req() request:PayloadType): Promise<Song> {
        return this.songsService.create(createSongDTO)
    }

    @Get('all')
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
        @Param('id', ParseIntPipe)
        id: number
    ): Promise<Song> {

        return this.songsService.findOne(id)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number,
        @Body() updatesongDto: UpdateSongDTO) {
        return this.songsService.update(id, updatesongDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songsService.delete(id)
    }

    @Get('')
    paginate(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
   ):Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
        return this.songsService.paginate({page, limit})
    }

}
