import { memo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Seminar, SeminarStore } from '../../models/SeminarStore';
import EditSeminarModal from '../EditSeminarModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { Instance } from 'mobx-state-tree';
import './index.sass';
interface SeminarItemProps {
	seminar: Instance<typeof Seminar>;
	store: Instance<typeof SeminarStore>;
}

const SeminarItem = memo(
	observer(({ seminar, store }: SeminarItemProps) => {
		const [isEditModalOpen, setEditModalOpen] = useState(false);
		const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

		const handleDelete = () => {
			store.deleteSeminar(seminar.id);
			setDeleteModalOpen(false);
		};

		return (
			<div className="seminars__item">
				<h2>{seminar.title}</h2>
				<p>
					{seminar.date} {seminar.time}
				</p>
				<p>{seminar.description}</p>
				<div className="seminars__item-btns">
					<button onClick={() => setEditModalOpen(true)}>Изменить</button>
					<button onClick={() => setDeleteModalOpen(true)}>Удалить</button>
				</div>

				<EditSeminarModal
					isOpen={isEditModalOpen}
					onClose={() => setEditModalOpen(false)}
					seminar={seminar}
					store={store}
				/>

				<ConfirmDeleteModal
					isOpen={isDeleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
					onConfirm={handleDelete}
				/>
			</div>
		);
	}),
);

export default SeminarItem;
