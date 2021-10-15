# n2server
NestJS + Next.js 테스트

## 소개
프로트엔드 개발에 최적화된 Next.js와 백엔드 개발에 최적화된 NestJS를 이용해서 서버 시스템을 구축하는 것을 목적으로 함

## 프로젝트 구조
- front: Next.js 기반의 프로트엔드 서버
- back: NestJS 기반의 백엔드 서버

## 환경 구성

### 필수 패키지
n2server를 구축하기 위해서는 기본적으로 다음과 같은 패키지들이 설치되어야 한다.
- npm
```bash
sudo apt-get install npm
```
- node 
```bash
sudo npm i -g n
```
```bash
sudo n 14.17.6
```
- npx
```bash
sudo npm i npx -g
```
- create-next-app: Next.js 프로젝트를 생성하고 기본 패키지를 설치해주는 프로그램
```bash
sudo npm i create-next-app -g
```
- @nestjs/cli: NestJS 프레임워크
```bash
sudo npm i -g @nestjs/cli
```

### front-end 구축
front라는 이름의 Next.js 프로젝트를 생성한다.
```bash
npx create-next-app front --typescript
```
--typescript 옵션을 추가하면 front프로젝트에서 typescript를 사용할 수 있도록 자동 설정된다.  

자바스크립트 문법 체크를 위한 ESLint를 설치한다.  
```bash
npx eslint --init
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-airbnb@latest
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.21.5 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.22.1 eslint-plugin-jsx-a11y@^6.4.1 eslint-plugin-react-hooks@^4 || ^3 || ^2.3.0 || ^1.7.0 @typescript-eslint/parser@latest
✔ Would you like to install them now with npm? · No / Yes
```

front 디렉토리로 이동해서 개발모드로 서버를 실행한다.
```bash
npm run dev
```

로컬호스트 3000으로 접속해서 웹페이지가 정상 출력되는지 확인한다.

### back-end 구축
back이라는 이름의 NestJS 프로젝트를 생성한다.
```bash
nest new back
```

back 디렉토리로 이동해서 개발모드로 서버를 실행한다. 이 때 Nest와 Next는 기본 동일한 3000번 포트를 사용함으로 Next 서버를 먼저 종료해야 한다.
```bash
npm run start:dev
```
로컬호스트 3000으로 접속해서 웹페이지가 정상 출력되는지 확인한다.

## Front-end와 Back-end 연동

### back-end에 테스트 리소스 추가
back-end에 새로운 리소스 apple을 추가해보자. 
back-end 서버가 개발모드로 동작하는 상태에서 back 디렉토리에서 다음과 같이 실행한다.
```bash
nest g res apple
```

back/src/apple 디렉토리가 생성되었는지 확인한 후 웹브라우저를 통해 http://localhost:3000/apple 로 접속을 시도한다.
"This action returns all apple" 메시지가 출력되면 정상적으로 리소스가 추가되고 CRUD 엔드포인트도 정상 동작하는 것이다.

### back-end 포트 변경
현재 설정에서는 front와 back 서버 모두 동일한 3000번 포트를 사용하므로 단일 서버에서 두 서버를 동작시키기 위해서는 포트번호를 변경해야 한다. 
back/src/main.ts 파일을 열어 기존 3000번 포트를 30001번으로 변경한다.
새로운 포트로 리소스(http://localhost:3001/apple)에 접속해 보자.

### front-end에 프록시 설정
현재까지의 설정에서는 front에 접근하기 위해서는 3000번 포트, back에 접근하기 위해서는 3001번 포트를 이용해야 한다. back-end를 private network으로 옮기고 front를 거처서만 back에 접근할 수 있게하면 보안적으로 보다 안전한 웹서비스가 가능해진다.

front에 프록시를 설정하기 위해 .env 파일을 생성하고 다음과 같이 작성한다.
```
SOURCE_PATH = '/api/:path*'
DESTINATION_URL = 'http://localhost:3001/:path*'
```

next.config.js 파일을 다음과 같이 수정한다.
```
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: process.env.SOURCE_PATH,
          destination: process.env.DESTINATION_URL,
        },
      ];
    }
  },
}
```

상기 두 파일의 내용은 front-end의 /api 패스로 수신되는 요청을 back-end로 전달하도록 설정한 것이다.
새롭게 추가된 .env파일의 내용이 반영되도록 front 서버를 재시작 한 후 front-end를 통해 back-end를 호출해 보자. 
http://localhost:3000/api/apple 로 접속하여 "This action returns all apple" 메시지가 정상 출력되는지 확인한다.


### DTO 환경 구축
front와 back간의 데이터 교환에 사용할 데이터 모델을 TypeScript 기반의 DTO 모델로 선언하여 사용하기 위한 환경을 구축한다. 이를 위해서 gts(Google TypeScript Style) npm 패키지를 이용한다.

프로젝트 root에서 dto 디렉토리를 생성하고 진입한 후 gts를 설치한다.
gts 설치
```bash
npm i gts
```

gts init으로 프로젝트를 세팅한다.
```bash
npx gts init
```

불필요한 파일들이 git으로 관리되는 것을 방지하기 위해 .gitignore파일을 생성하고 다음과 같이 작성한다. gts의 github 소스코드를 그대로 이용한 것이다. 빌드 결과물을 저장할 dist 디렉토리만 추가한다.
```
.DS_Store
.nyc_output
.vscode
build
dist
coverage
node_modules
npm-debug.log
yarn-error.log
yarn.lock
__pycache__
```

### 새로운 데이터 모델 생성
Animal이라는 데이터 모델을 추가해서 font와 back간에 데이터 교환 모델로 사용하는 방법에 대해서 알아보자.

tsconfig.json 파일의 compilerOptions 항목을 다음과 같이 수정해서 빌드된 결과물이 dist 디렉토리에 생성되도록 한다.
```
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
  },
```
/dto/src 디렉토리에 Animal.ts 파일을 생성하고 다음과 같이 작성한다.
```
// 기본적인 DTO
export interface Animal {
    name: string;
    color: 'RED' | 'GREEN' | 'BLACK';
    age?: number;
}

// 데이터 Post API에서 사용할 DTO
export interface CreateAnimalDto extends Animal {
}

// 데이터 Patch API에서 사용할 DTO
export interface UpdateAnimalDto extends Partial<CreateAnimalDto> {
}
```

그리고 /dto 디렉토리에서 컴파일을 시도한다.
```bash
npm run compile
```

/dto/dist 디렉토리가 생성되면서 빌드 결과물이 추가되었는지를 확인한다.


### back-end에 새로운 리소스 등록
back에 Animal 모델을 이용하는 리소스를 추가해 보자.

```bash
nest g res animals
```

src/에 animals 디렉토리로 이동해서 불필요한 디렉토리와 파일을 삭제한다.
- dto, entities 디렉토리: 앞서 작성한 dto를 사용함으로 불필요함
- *.spec.ts 파일: 테스트에 사용되는 파일들로 현재 불필요함

animals.service.ts 파일을 다음과 같이 수정한다. 기본 생성되어 참조되던 DTO를 걷어내고 dto 프로젝트에서 생성한 Animal 모델을 이용하도록 변경한 것이다.
```
import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal, CreateAnimalDto, UpdateAnimalDto } from '../../../dto/dist/Animal';

@Injectable()
export class AnimalsService {

  // 가상 DB로 사용할 데이터
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
```

다음으로 animals.controller.ts 파일을 수정한다.
```
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
```

수정 후 http://localhost:3001/animals/ 로 접속하여 CRUD 기능이 정상 동작하는지 확인한다.

### front-end에서 back-end 호출
front-end에서 back-end의 API의 호출이 가능하도록 새로운 페이지를 추가해보자.
front/pages/examples에 animals.tsx 파일을 추가하고 다음과 같이 작성한다.
```
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Animal } from "../../../dto/dist/Animal"
import axios from 'axios';

function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const animals: Animal[] = data;

  return (
    <div>
      <h3>Animal Example</h3>
      {animals.map((animal) => (
        <div>
          <p>name: {animal.name}</p>
          <p>coloe: {animal.color}</p>
          <p>age: {animal.age}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('http://localhost:3001/animals/');
  const data: Animal[] = res.data as any as Animal[];

  return {
    props: { data }
  }
}

export default Page

```
역시 미리 작성했던 dto의 Animal 타입을 사용하도록 import 하였다.
getServiceSideProps는 페이지가 랜더링 되기 전에 서버(back-end)로부터 데이터를 읽어온 후 그 데이터를 기반으로 페이지를 랜더링하여 클라이언트에게 전달한다.
back-end와의 통신을 위해서 axios 패키지가 필요하므로 미리 설치해야 한다.
위 소스에서는 back-end의 컨트롤러와 서비스를 거쳐 animalList값을 배열로 수신한 후 화면에 출력하는 예제이다.
http://localhost:3000/examples/animals 에 접속하여 정상적으로 animalList의 정보가 출력되는지 확인한다.


# 타이틀1(#)
## 타이틀2(##)
### 타이틀3(###)
- 아이템(-)
### 코드 사용법

```bash
```
