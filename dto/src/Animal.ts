export interface Animal {
  name: string;
  color: 'RED' | 'GREEN' | 'BLACK';
  age?: number;
}

export interface CreateAnimalDto extends Animal { };

export interface UpdateAnimalDto extends Partial<CreateAnimalDto> { };