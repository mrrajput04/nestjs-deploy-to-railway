import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

require('dotenv').config()

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('dbUser'),
      database: configService.get<string>('dbName'),
      password: configService.get<string>('password'),
      // entities: ['dist/**/*.entity.js'],
      entities:[User, Artist, Playlist, Song, ],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  // entities: ['dist/**/*.entity.js'],
  entities:[User, Artist, Playlist, Song, ],
  synchronize: false, // 2
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;