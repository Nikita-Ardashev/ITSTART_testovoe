import initializeDatabase from './database';
import fs from 'fs';

async function importJsonToDb() {
	const db = await initializeDatabase();
	if (db === null) return;
	const jsonData = fs.readFileSync('./src/data/seminars.json', 'utf-8');
	const { seminars } = JSON.parse(jsonData);

	for (const seminar of seminars) {
		await db.run(
			`INSERT INTO seminars (id, title, description, date, time, photo) VALUES (?, ?, ?, ?, ?, ?)`,
			[
				seminar.id,
				seminar.title,
				seminar.description,
				seminar.date,
				seminar.time,
				seminar.photo,
			],
		);
		console.log(`Inserted seminar: ${seminar.title}`);
	}

	console.log('All data imported successfully');
	await db.close();
}

importJsonToDb().catch(console.error);
