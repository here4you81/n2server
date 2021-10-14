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
# 타이틀1(#)
## 타이틀2(##)
### 타이틀3(###)
- 아이템(-)
### 코드 사용법

```bash
```
