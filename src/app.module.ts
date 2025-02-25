import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs/song.entity';
import { User } from './users/user.entity';
import { Playlist } from './playlists/playlist.entity';

const devConfig = { port: 4000 }
const prodConfig = { port: 3100 }

@Module({
  imports: [ TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    database:"spotify-clone",
    port:5432,
    username:"postgres",
    password:"root",
    entities:[Song, User, Playlist],
    synchronize: true
  }),
    UserModule, BlogModule, AuthModule, CommonModule, SongsModule],
  controllers: [AppController],
  providers: [AppService]
    // {
    //   provide: DevConfigService,
    //   useClass: DevConfigService,
    // }, {
    //   provide: 'CONFIG',
    //   useFactory: () => {
    //     return process.env.NODE_ENV === "devlopement" ? devConfig : prodConfig;
    //   }
    // }
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs') //option 1
    // consumer.apply(LoggerMiddleware).forRoutes({path:"songs", method:RequestMethod.POST}) //option 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController)
  }
}
