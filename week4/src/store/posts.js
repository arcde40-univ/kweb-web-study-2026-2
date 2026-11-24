// 방명록 글을 MariaDB에 저장합니다. (compose의 db 서비스)
// 서버를 껐다 켜도 글이 남습니다. 3주차에는 메모리 배열이었어요.
// 함수 이름은 3주차와 같습니다. 다만 DB는 네트워크 너머에 있어서
// 결과가 바로 오지 않고 Promise로 옵니다. 그래서 라우트에 await가 붙었습니다.
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'kweb',
  password: process.env.DB_PASSWORD || '1q2w3e4r',
  database: process.env.DB_NAME || 'kweb_db', // 테스트는 kweb_test
});

// 처음 한 번만 테이블을 만듭니다. (이미 있으면 그대로 둡니다)
const ready = pool.query(`
  CREATE TABLE IF NOT EXISTS posts (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    author  VARCHAR(50),
    content TEXT NOT NULL,
    CHECK (content <> '')
  )
`);

async function findAll() {
  await ready;
  const [rows] = await pool.query('SELECT id, author, content FROM posts ORDER BY id');
  return rows;
}

async function create({ author, content }) {
  await ready;
  const [result] = await pool.query(
    'INSERT INTO posts (author, content) VALUES (?, ?)', [author ?? null, content]);
  return { id: result.insertId, author, content };
}

async function remove(id) {
  await ready;
  const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

// 테스트에서만 씁니다: 매번 빈 테이블에서 시작하고, 끝나면 연결을 닫습니다.
async function reset() {
  await ready;
  await pool.query('TRUNCATE TABLE posts');
}
async function close() {
  await pool.end();
}

module.exports = { findAll, create, remove, reset, close };
