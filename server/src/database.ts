import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initializeDatabase() {
	try {
		const db = await open({
			filename: './database.db',
			driver: sqlite3.Database,
		});
		console.log('Database connected successfully');
		await db.exec(`
      CREATE TABLE IF NOT EXISTS seminars (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT,
        time TEXT,
        photo TEXT
      );
    `);

		return db;
	} catch (error) {
		console.error('Database connection error:', error);
	}
	return null;
}

export default initializeDatabase;
