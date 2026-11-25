# 저장소를 MariaDB로 바꾸기

실습 1단계에서 씁니다.

```
src/store/posts.js 를 MariaDB(mysql2)로 바꿔줘.

- 접속은 compose의 db 서비스, DB는 kweb_db
  접속 정보는 환경변수(DB_HOST 등)로 받기
- findAll, create, remove 이름은 그대로
- 테이블은 spec.md 데이터 표대로, content는 NOT NULL
- 테스트는 별도 DB(kweb_test)로 돌리고
  테스트마다 테이블을 비워줘
- test/posts.test.js 는 건드리지 마
  routes는 await 붙이는 것만
```

- 첫 줄은 무엇을 할지, 나머지는 무엇을 지킬지입니다.
- 지킬 것은 전부 확인할 수 있는 문장으로 씁니다. (파일 목록, `git diff --stat`, `npm test`)
- "깔끔하게 해줘"보다 확인할 수 있는 부탁이 낫습니다.
