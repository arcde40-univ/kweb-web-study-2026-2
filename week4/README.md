# 4주차 샘플: 방명록 API + MariaDB

3주차 샘플에서 저장소(`src/store/posts.js`)를 compose의 MariaDB(`db` 서비스)로 바꾼 버전입니다.

> 참고: Codespace에서 작업 중이라면 각 코드 블럭 옆 실행 버튼을 눌러 바로 실행할 수 있습니다.

## 처음 한 번: 테스트용 DB 만들기

```bash
docker compose exec db mariadb -uroot -pkwebstudy -e "
  CREATE DATABASE IF NOT EXISTS kweb_test;
  GRANT ALL ON kweb_test.* TO 'kweb'@'%';"
```

## 실행

```bash
npm install
npm start        # http://localhost:3000, 글은 kweb_db의 posts 테이블에 저장
```

서버를 껐다 켜도 글이 남습니다. `posts` 테이블은 처음 실행할 때 자동으로 만들어집니다.
compose 밖(내 컴퓨터)에서 실행한다면 `DB_HOST=localhost npm start`.

## 테스트

```bash
npm test         # DB_NAME=kweb_test 로 실행, 테스트마다 posts를 비우고 시작
```

## 접속 정보 (환경변수, 없으면 compose 기본값)

| 변수          | 기본값     |
| ------------- | ---------- |
| `DB_HOST`     | `db`       |
| `DB_PORT`     | `3306`     |
| `DB_USER`     | `kweb`     |
| `DB_PASSWORD` | `1q2w3e4r` |
| `DB_NAME`     | `kweb_db`  |

## 실습 가이드

[PRACTICE.md](PRACTICE.md)에 실습 순서와 확인 방법을, [prompts/](prompts/)에 AI에게 줄 프롬프트를 정리해뒀습니다.

## 구조

```
src/
├── app.js            Express 앱
├── server.js         서버 실행
├── routes/posts.js   /posts 경로 처리 (await만 추가)
└── store/posts.js    글 저장 (메모리 → MariaDB)
prompts/              AI에게 줄 프롬프트 (md)
test/
├── setup.js          테스트 DB 확인, 테스트마다 초기화 (새 파일)
└── posts.test.js     spec.md의 각 행을 테스트로 (3주차와 같음)
```
