import { Module } from '@nestjs/common';
import { DraftingModule } from './drafting/drafting.module';
import { PublishingModule } from './publishing/publishing.module';
import { CommentingModule } from './commenting/commenting.module';

@Module({
  imports: [DraftingModule, PublishingModule, CommentingModule]
})
export class BlogModule {}
