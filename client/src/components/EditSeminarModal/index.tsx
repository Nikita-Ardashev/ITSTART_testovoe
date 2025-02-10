import { memo, useCallback, useState, useEffect } from 'react';
import { Seminar, SeminarStore } from '../../models/SeminarStore';
import { Instance, SnapshotIn } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';

interface EditSeminarModalProps {
	isOpen: boolean;
	onClose: () => void;
	seminar: Instance<typeof Seminar>;
	store: Instance<typeof SeminarStore>;
}

const EditSeminarModal = memo(
	observer(({ isOpen, onClose, seminar, store }: EditSeminarModalProps) => {
		const [newSeminar, setNewSeminar] = useState<SnapshotIn<typeof Seminar>>(seminar);

		useEffect(() => {
			setNewSeminar(seminar);
		}, [seminar]);

		const handleEdit = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setNewSeminar((prev) => ({
				...prev,
				[name]: value,
			}));
		}, []);

		const handleSave = useCallback(() => {
			store.updateSeminar(newSeminar);
			onClose();
		}, [newSeminar, store, onClose]);

		if (!isOpen) return null;

		return (
			<div className="modal">
				<div className="modal-content">
					<h2>Изменить семинар</h2>
					<input
						type="text"
						name="title"
						value={newSeminar.title}
						placeholder="Введите название"
						onChange={handleEdit}
					/>
					<input
						type="text"
						name="description"
						value={newSeminar.description}
						onChange={handleEdit}
						placeholder="Введите описание"
					/>
					<input
						type="date"
						name="date"
						value={newSeminar.date.split('.').reverse().join('-')}
						onChange={handleEdit}
					/>
					<input
						type="time"
						name="time"
						value={newSeminar.time}
						onChange={handleEdit}
					/>
					<input
						type="text"
						name="photo"
						value={newSeminar.photo}
						onChange={handleEdit}
						placeholder="Введите ссылку на фото"
					/>
					<div>
						<button onClick={handleSave}>Сохранить</button>
						<button onClick={onClose}>Отменить</button>
					</div>
				</div>
			</div>
		);
	}),
);

export default EditSeminarModal;
