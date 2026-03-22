const { Router } = require('express');
const db = require('../db');

const router = Router();

router.post('/getPreviews', (req, res) => {
  const { userId, search } = req.body;

  let sql = 'SELECT id, title, SUBSTRING(`content`, 1, 700) AS content FROM note ';

  if (search) {
    const searchPattern = db.escape(`%${search}%`);
    sql += `WHERE title LIKE ${searchPattern} OR content LIKE ${searchPattern}`;
  }

  db.pool.query(sql, (err, notes) => {
    res.json({ err, notes });
  });
});

router.post('/get', (req, res) => {
  const { userId, id } = req.body;

  const sql = `SELECT id, title, content FROM note WHERE id=${db.escape(id)}`;

  db.pool.query(sql, (err, notes) => {
    res.json({ err, note: notes[0] });
  });
});

router.post('/post', (req, res) => {
  const {
    userId, title, content
  } = req.body;

  let insertNoteSql = 'INSERT INTO note (title, content) VALUES ';
  insertNoteSql += `(${db.escape(title)}, ${db.escape(content)})`;

  db.pool.query(insertNoteSql, (insertNoteErr, okPacket) => {
    if (insertNoteErr) {
      res.json({ err: insertNoteErr });
      return;
    }

    const getNoteSql = `SELECT id, title, content FROM note WHERE id=${db.escape(okPacket.insertId)}`;

    db.pool.query(getNoteSql, (getNoteErr, notes) => {
      if (getNoteErr) {
        res.json({ err: getNoteErr });
        return;
      }
    });
  });
});

router.put('/put', (req, res) => {
  const {
    userId, id, title, content
  } = req.body;

  let sql = 'INSERT INTO note (id, title, content) VALUES ';
  sql += `(${db.escape(id)}, ${db.escape(title)}, ${db.escape(content)}) AS new `;
  sql += 'ON DUPLICATE KEY UPDATE title=new.title, content=new.content';

  db.pool.query(sql, (err) => {
    res.json({ err });
  });
});

router.post('/delete', (req, res) => {
  const {
    userId, id
  } = req.body;

  const sql = `DELETE FROM note WHERE id=${db.escape(id)}`;

  db.pool.query(sql, (err) => {
    res.json({ err });
  });
});

module.exports = router;
