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
import { PlaylistModule } from './playlists/playlist.module';
import { DataSource } from 'typeorm';
import { Artist } from './artists/artist.entity';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from '../db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { validate } from 'env-validation';

const devConfig = { port: 4000 }
const prodConfig = { port: 3100 }

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      load: [configuration],
      validate: validate
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    PlaylistModule,
    AuthModule,
    UserModule,
    ArtistsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }

  ]
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
export class AppModule
// implements NestModule
{
  // constructor(private datasource: DataSource) {
  //   console.log("db connection successfully")
  // }
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(LoggerMiddleware).forRoutes('songs') //option 1
  //   // consumer.apply(LoggerMiddleware).forRoutes({path:"songs", method:RequestMethod.POST}) //option 2
  //   consumer.apply(LoggerMiddleware).forRoutes(SongsController)
  // }
}
