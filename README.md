# 대일리

## 2022 해커톤 팀 치킨밴딧

> (대)구의 (일)상을 (이)롭게

<!--[![NPM Version][npm-image]][npm-url]-->
<!--[![Build Status][travis-image]][travis-url]-->
<!--[![Downloads Stats][npm-downloads]][npm-url]-->

1. 건의하기
2. 대구광역시 공지, 혜택
3. 현재 인기 안건 (카테고리별로 볼 수 있음)
4. 게시 기능 (투표도 가능)
5. 회원가입

## 설치 방법

윈도우:

```sh

```  

## 실행 환경 

### 1. 서버 실행 (Docker 활용) [@Docker 이미지 주소](https://hub.docker.com/repository/docker/0rdinary/daeily)
우선 Docker 이미지를 받습니다.
```shell
docker pull 0rdinary/daeily
```
Docker 이미지가 제대로 받아졌는지 확인합니다.
```shell
docker images
```
```shell
REPOSITORY        TAG       IMAGE ID       CREATED        SIZE
0rdinary/daeily   0.0.1     418f32703b88   9 hours ago    484MB
```
그 후 Docker 컨테이너를 실행시킵니다.
```shell
docker run -p [외부 Port]:[Docker Port] [Image ID]
```
기본 Port는 외부 80, Docker 8080입니다.
```shell
docker run -p 80:8080 418f32703b88
```
## 사용 예제

업데이트 예정입니다.

## 개발 환경 설정

추가 예정입니다.

```sh

```

## 업데이트 내역

* 0.0.1
    * 작업 진행 중

## 팀 멤버

김경수 – [@Github](https://github.com/Roy052) – tdj04131@gmail.com  
김현학 – [@Github](https://github.com/crihit) – rlagusgkr98@gmail.com  
윤진 – [@Github](https://github.com/ideasidus) – ideasidus@gmail.com  
정명원– [@Github](https://github.com/0rdinary) – ac980925@gmail.com  