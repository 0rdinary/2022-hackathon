# 대일리 (Daeily)

> (대)구의 (일)상을 (이)롭게

<!--[![NPM Version][npm-image]][npm-url]-->
<!--[![Build Status][travis-image]][travis-url]-->
<!--[![Downloads Stats][npm-downloads]][npm-url]-->

## 주요 기능
>* 대구시의 정책 홍보(팝업)
>* 대구시에 대한 건의 게시
>* 건의사항에 대한 주민여론을 확인하기 위한 투표 및 댓글작성

## 활용 방법
임시  
[![Video Label](http://img.youtube.com/vi/uLR1RNqJ1Mw/0.jpg)](https://youtu.be/uLR1RNqJ1Mw?t=0s)

## 설치 및 실행 방법
### Spring을 빌드
backend 디렉토리로 이동 후 아래의 명령어로 Spring을 빌드합니다.
```shell
gradlew build --exclude-task test
```
그 후 Firebase에 연결하기 위한 비공개 키 json파일을 해당 디렉토리에 위치시킵니다.
### Docker를 사용하여 실행
다시 최상위 디렉토리로 이동한 후 아래의 명령을 실행시켜 서버를 구동합니다.
```shell
 docker-compose up --build
```
명령 실행 시 Docker Hub로 부터 [0rdinary/daeily-front](https://hub.docker.com/r/0rdinary/daeily-front) 의 이미지를 내려받습니다.

>**Note**
>약 500MB의 공간을 필요로 하므로 미리 확인하여 주십시오.
해당 프로그램은 80번 PORT의 개방을 필요로 합니다.

## 개발 환경 설정
>**Warning**
>해당 방법은 Spring과 React간의 통신이 제한됩니다.
>>**Note**
>>frontend/src/setupProxy.js의 target을 아래와 같이 수정할 시 통신가능  
>> ```target: 'http://localhost:8080'```

backend 디렉토리에서 아래의 명령어로 Spring을 빌드할 수 있습니다.
```shell
gradlew build --exclude-task test
```
backend/build/libs 디렉토리로 이동하여 Firebase에 연결하기 위한 비공개 키 json파일을 해당 디렉토리에 위치시킵니다.   
그리고 아래의 명령어로 Spring을 실행시킬 수 있습니다.
```shell
java -jar daeily-{version}-SNAPSHOT.jar
```
frontend 디렉토리에서 아래의 명령어로 React에 필요한 모듈을 설치할 수 있습니다.
```shell
npm install
```
이후 아래의 명령어로 React를 실행시킬 수 있습니다.
```shell
npm run start
```

## 팀 멤버
>### 치킨밴딧
>* 김경수 – [@Github](https://github.com/Roy052) – tdj04131@gmail.com  
>* 김현학 – [@Github](https://github.com/crihit) – rlagusgkr98@gmail.com  
>* 윤진 – [@Github](https://github.com/ideasidus) – ideasidus@gmail.com  
>* 정명원– [@Github](https://github.com/0rdinary) – ac980925@gmail.com  