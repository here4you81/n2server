import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppleService } from './apple.service';
import { CreateAppleDto } from './dto/create-apple.dto';
import { UpdateAppleDto } from './dto/update-apple.dto';
import { N2Props } from "../../../dto/build/src/N2Props"

@Controller('apple')
export class AppleController {
  constructor(private readonly appleService: AppleService) { }

  @Post()
  create(@Body() createAppleDto: CreateAppleDto) {
    return this.appleService.create(createAppleDto);
  }

  @Get()
  findAll(): N2Props {
    console.log("findAll");
    const props: N2Props = {
      apiName: "findAll",
      index: 1,
      message: "Hello!!!"
    };

    return props;

    // return this.appleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppleDto: UpdateAppleDto) {
    return this.appleService.update(+id, updateAppleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appleService.remove(+id);
  }
}
