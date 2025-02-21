import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService){}

    @Post()
    create(){
        return this.songsService.create("animal by martin")
    }

    @Get()
    findAll(){
    return this.songsService.findAll()
    }

    @Get(':id')
    findOne(){
        return 'songs fetch successfully based on id'
    }

    @Put(':id')
    update(){
        return 'update song successfully based on id'
    }

    @Delete(':id')
    dekete(){
        return 'delete song successfully based on id'
    }

}
