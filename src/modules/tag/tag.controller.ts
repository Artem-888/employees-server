import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, DeleteTagParamDto } from './dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  getTags() {
    return this.tagService.findAll();
  }

  @Delete(':id')
  deleteTag(@Param() params: DeleteTagParamDto) {
    return this.tagService.delete(params.id);
  }

  @Delete()
  deleteAllTags() {
    return this.tagService.deleteAll();
  }
}
