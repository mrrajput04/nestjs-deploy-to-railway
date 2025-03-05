import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {

    constructor(
        @InjectRepository(Artist)
        private artistReposity: Repository<Artist>
    ) { }

    async findArtist(userId: number):Promise<Artist> {
        return this.artistReposity.findOneBy({ user: { id: userId } })
    }

}
