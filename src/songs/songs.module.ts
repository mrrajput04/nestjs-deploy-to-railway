import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';

// const mockSongsService = {
//   findAll(){
//     return [{id:1, title:"Tum hi ho"}]
//   }
// }

@Module({
  imports:[TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useClass: SongsService
    // }
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService
    // }
    // {
    //   provide:"CONNECTION",
    //   useValue: connection
    // }
  ]
})
export class SongsModule {}
