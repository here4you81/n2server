import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { Animal, CreateAnimalDto, UpdateAnimalDto } from '../../../dto/dist/Animal';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) { }

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    console.log("create");
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  findAll(): Animal[] {
    console.log("findAll");
    return this.animalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Animal {
    console.log("findOne, id=" + id);
    return this.animalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    console.log("update");
    return this.animalsService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("remove");
    return this.animalsService.remove(+id);
  }
}
