import { Router } from 'express';
import {
	createSeminar,
	deleteSeminar,
	getAllSeminars,
	getSeminarById,
	updateSeminar,
} from '../controllers/seminar.controller';

const router = Router();

/**
 * @swagger
 * /api/seminars:
 *   get:
 *     summary: Получить все семинары
 *     description: Возвращает список всех семинаров.
 *     responses:
 *       200:
 *         description: Успешный запрос
 *         content:
 *           routerlication/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seminar'
 */
router.get('/', async (req, res) => {
	const seminars = await getAllSeminars();
	res.json(seminars);
});

/**
 * @swagger
 * /api/seminars/{id}:
 *   get:
 *     summary: Получить семинар по ID
 *     description: Возвращает семинар по указанному ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID семинара
 *     responses:
 *       200:
 *         description: Успешный запрос
 *         content:
 *           routerlication/json:
 *             schema:
 *               $ref: '#/components/schemas/Seminar'
 *       404:
 *         description: Семинар не найден
 */
router.get('/:id', async (req, res) => {
	const id = parseInt(req.params.id, 10);
	const seminar = await getSeminarById(id);
	if (seminar) {
		res.json(seminar);
	} else {
		res.status(404).json({ message: 'Seminar not found' });
	}
});

/**
 * @swagger
 * /api/seminars:
 *   post:
 *     summary: Создать новый семинар
 *     description: Создает новый семинар.
 *     requestBody:
 *       required: true
 *       content:
 *         routerlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Seminar'
 *     responses:
 *       201:
 *         description: Семинар успешно создан
 *         content:
 *           routerlication/json:
 *             schema:
 *               $ref: '#/components/schemas/Seminar'
 */
router.post('/', async (req, res) => {
	const newSeminar = req.body;
	const seminarId = await createSeminar(newSeminar);
	res.status(201).json({ id: seminarId, ...newSeminar });
});

/**
 * @swagger
 * /api/seminars/{id}:
 *   put:
 *     summary: Обновить семинар
 *     description: Обновляет данные семинара по указанному ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID семинара
 *     requestBody:
 *       required: true
 *       content:
 *         routerlication/json:
 *           schema:
 *             $ref: '#/components/schemas/Seminar'
 *     responses:
 *       200:
 *         description: Семинар успешно обновлен
 *         content:
 *           routerlication/json:
 *             schema:
 *               $ref: '#/components/schemas/Seminar'
 */
router.put('/:id', async (req, res) => {
	const id = parseInt(req.params.id, 10);
	const updatedSeminar = req.body;
	await updateSeminar(id, updatedSeminar);
	res.json({ id, ...updatedSeminar });
});

/**
 * @swagger
 * /api/seminars/{id}:
 *   delete:
 *     summary: Удалить семинар
 *     description: Удаляет семинар по указанному ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID семинара
 *     responses:
 *       204:
 *         description: Семинар успешно удален
 */
router.delete('/:id', async (req, res) => {
	const id = parseInt(req.params.id, 10);
	await deleteSeminar(id);
	res.status(204).send();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Seminar:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор семинара
 *         title:
 *           type: string
 *           description: Название семинара
 *         description:
 *           type: string
 *           description: Описание семинара
 *         date:
 *           type: string
 *           format: date
 *           description: Дата проведения семинара
 *         time:
 *           type: string
 *           description: Время проведения семинара
 *         photo:
 *           type: string
 *           description: Ссылка на фото семинара
 *       example:
 *         id: 1
 *         title: Новинки Kosmoteros
 *         description: Обзор новых средств и методик от Kosmoteros.
 *         date: 2025-01-01
 *         time: 10:00
 *         photo: https://picsum.photos/id/1/750/730
 */

export default router;
