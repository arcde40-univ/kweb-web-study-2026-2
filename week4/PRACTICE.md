# 4주차 실습 가이드

3주차 결과물(또는 `spec.md` 샘플)에서 시작합니다. 막히면 이 폴더의 코드를 참고하세요.

## 0. 테스트용 DB 만들기 (처음 한 번)

```bash
docker compose exec db mariadb -uroot -pkwebstudy -e "
  CREATE DATABASE IF NOT EXISTS kweb_test;
  GRANT ALL ON kweb_test.* TO 'kweb'@'%';"
```

## 1. 주문하기

[prompts/01-store-mariadb.md](prompts/01-store-mariadb.md)의 문장으로 AI에게 부탁합니다.

다른 프롬프트도 `prompts/`에 있습니다.

| 파일 | 언제 |
| --- | --- |
| `01-store-mariadb.md` | 저장소를 MariaDB로 바꿀 때 |
| `02-schema-design.md` | 기능이 늘어 테이블을 나눌 때 |
| `03-fake-store-test.md` | 라우트를 DB 없이 테스트할 때 |

## 2. 확인하기

### 테스트는 그대로 통과하나

```bash
npm test
# Tests:  5 passed, 5 total
```

- `test/posts.test.js`는 그대로입니다.
- 같은 입력에 같은 기대 결과가 나오면, 바깥에서 보기에는 같은 서버입니다.
- 실패하면 코드를 읽기 전에 Expected와 Received부터 봅니다.

### 껐다 켜도 남나

```bash
curl -X POST localhost:3000/posts -H 'Content-Type: application/json' \
  -d '{"author":"영민","content":"안녕!"}'
# 서버를 끄고 (Ctrl+C) 다시 켠 뒤
curl localhost:3000/posts
# [{"id":1,"author":"영민","content":"안녕!"}]
```

- 3주차에는 여기서 `[]`가 나왔습니다.
- "남는다"는 이번 주에 새로 생긴 약속이라 테스트 대신 직접 확인합니다.
- `docker compose restart db` 뒤에도 남는지 확인합니다.

### 구조는 그대로인가

```bash
git diff --stat
```

- 바뀐 파일이 `src/store/posts.js`, `src/routes/posts.js`(await만), `test/setup.js`, `package.json` 정도인지 봅니다.

## 3. PR 올리기

파일 목록을 한 번 더 확인하고 Pull Request를 만듭니다.
