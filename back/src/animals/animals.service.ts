import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal, CreateAnimalDto, UpdateAnimalDto } from '../../../dto/dist/Animal';



@Injectable()
export class AnimalsService {
  private animalList: Animal[] = [
    { name: "babe0", color: "RED", age: 0 },
    { name: "babe1", color: "GREEN", age: 1 },
    { name: "babe2", color: "BLACK", age: 2 },
    { name: "babe3", color: "BLACK", age: 3 },
    { name: "babe4", color: "BLACK", age: 4 },
    { name: "babe5", color: "BLACK", age: 5 },
  ];

  create(createAnimalDto: CreateAnimalDto) {
    this.animalList.push(createAnimalDto);
    return 'This action adds a new animal';
  }

  findAll(): Animal[] {
    return this.animalList;
  }

  findOne(id: number): Animal {
    if (id > this.animalList.length)
      throw new NotFoundException(`Animal with ID ${id} not found.`);
    return this.animalList[id];
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    console.log("id= " + id + ", data= " + JSON.stringify(updateAnimalDto));
    const thatOne = this.findOne(id);
    console.log(Object.assign(thatOne, updateAnimalDto));
    this.animalList[id] = Object.assign(thatOne, updateAnimalDto);
  }

  remove(id: number) {
    const thatOne = this.findOne(id);
    this.animalList =
      this.animalList.filter(animal => animal.name != thatOne.name);
    return `This action removes a #${id} animal`;
  }
}
