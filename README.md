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
npx create-next-app front
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







# 타이틀1(#)
## 타이틀2(##)
### 타이틀3(###)
- 아이템(-)
### 코드 사용법

```bash
```
