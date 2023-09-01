<h1 align="center">Welcome to NFTBank reboot 👋</h1>

[![Maintainability](https://api.codeclimate.com/v1/badges/9dbadeb196048a24900c/maintainability)](https://codeclimate.com/repos/642fb1ed09e0bc00bb8151a3/maintainability)

[nftbank.ai](https://nftbank.ai/) NFTBank .

## Install

```sh
yarn
```

## Test in a local

```sh
yarn run dev
yarn run turbo // Build using Turbopack
```

What is [Turbopack?](https://turbo.build/pack)

## Directory Structure

```sh
├── apis  //data fetching api 명세
├── app //next route 에 해당
├── components  //react component
│   └── providers //프로바이더들 정의
├── interfaces  //타입 정의
├── store //jotai 에서 사용할 atom들
├── constants //사이트 전역적으로 쓰일 상수들
├── cypress //cypress testing 관련
├── env //dev,prod에서 환경분리를 위한 값들
├── utils
│   ├── hooks
│   ├── queries //reactquery에서 쓰일 query들 정의
│   └── mutations //reactquery 에서 쓰일 mutaions들 정의
└── public //각종 asset들. 이미지, svg 등
```
