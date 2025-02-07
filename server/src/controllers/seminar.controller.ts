import { ISeminar } from 'src/models/seminar.model';
import initializeDatabase from '../database';

export async function getAllSeminars() {
	const db = await initializeDatabase();
	if (db === null) return;

	const seminars = await db.all<ISeminar[]>('SELECT * FROM seminars');
	await db.close();
	return seminars;
}

export async function getSeminarById(id: number) {
	const db = await initializeDatabase();
	if (db === null) return;

	const seminar = db.get('SELECT * FROM seminars WHERE id = ?', [
		id,
	]) as Promise<ISeminar>;
	await db.close();
	return seminar;
}

export async function createSeminar(seminar: ISeminar) {
	const db = await initializeDatabase();
	if (db === null) return;

	const { title, description, date, time, photo } = seminar;
	const result = await db.run(
		'INSERT INTO seminars (title, description, date, time, photo) VALUES (?, ?, ?, ?, ?)',
		[title, description, date, time, photo],
	);
	await db.close();
	return result.lastID;
}

export async function updateSeminar(id: number, seminar: ISeminar) {
	const db = await initializeDatabase();
	if (db === null) return;

	const { title, description, date, time, photo } = seminar;
	await db.run(
		'UPDATE seminars SET title = ?, description = ?, date = ?, time = ?, photo = ? WHERE id = ?',
		[title, description, date, time, photo, id],
	);
	await db.close();
}

export async function deleteSeminar(id: number) {
	const db = await initializeDatabase();
	if (db === null) return;

	await db.run('DELETE FROM seminars WHERE id = ?', [id]);
	await db.close();
}
