// npm test 때만 실행됩니다. (package.json의 jest 설정)
// 테스트는 진짜 방명록(kweb_db)이 아니라 kweb_test DB를 씁니다.
const store = require('../src/store/posts');

if (process.env.DB_NAME !== 'kweb_test') {
  throw new Error('테스트는 kweb_test DB로만 돌립니다. npm test로 실행하세요.');
}

beforeEach(() => store.reset());
afterAll(() => store.close());
