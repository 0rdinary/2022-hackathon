# 대일리 (Daeily)

> (대)구의 (일)상을 (이)롭게

<!--[![NPM Version][npm-image]][npm-url]-->
<!--[![Build Status][travis-image]][travis-url]-->
<!--[![Downloads Stats][npm-downloads]][npm-url]-->

1. 건의하기
2. 대구광역시 공지, 혜택
3. 현재 인기 안건 (카테고리별로 볼 수 있음)
4. 게시 기능 (투표도 가능)
5. 회원가입

## 설치 및 실행 방법

### Docker를 활용하여 실행
우선 Docker-compose 설정파일 [docker-compose.yml](https://github.com/0rdinary/2022-hackathon/blob/main/docker-compose.yml)
을 준비합니다.  
그 후 해당 파일이 있는 위치로 가서 아래 명령을 실행시킵니다.
```shell
 docker-compose up
```
명령 실행 시 Docker Hub로 부터 [0rdinary/daeily](https://hub.docker.com/r/0rdinary/daeily)
와 [0rdinary/daeily-front](https://hub.docker.com/r/0rdinary/daeily-front) 의 이미지를 내려받습니다.
약 500MB의 공간을 필요로 하므로 미리 확인하여 주십시오.  
  
해당 프로그램은 80번 PORT의 개방을 필요로 합니다. 
## 사용 예제

업데이트 예정입니다.

## 개발 환경 설정
최상위 디렉토리에서 아래의 명령어로 Spring을 실행시킬 수 있습니다.
```shell
gradlew build --exclude-task test
```
/src/main/frontend 디렉토리에서 아래의 명령어로 React를 실행시킬 수 있습니다.
```shell
npm run start
```
## 업데이트 내역

* 0.0.1
    * 작업 진행 중

## 팀 멤버

김경수 – [@Github](https://github.com/Roy052) – tdj04131@gmail.com  
김현학 – [@Github](https://github.com/crihit) – rlagusgkr98@gmail.com  
윤진 – [@Github](https://github.com/ideasidus) – ideasidus@gmail.com  
정명원– [@Github](https://github.com/0rdinary) – ac980925@gmail.com  