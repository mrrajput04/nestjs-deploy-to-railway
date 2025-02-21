import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [UserModule, BlogModule, AuthModule, CommonModule, SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
