import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'crud_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Create
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.status(201).send('Item created successfully');
  });
});

// Read
app.get('/api/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update
app.put('/api/items/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  db.query(sql, [name, description, id], (err, result) => {
    if (err) throw err;
    res.send('Item updated successfully');
  });
});

// Delete
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Item deleted successfully');
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});