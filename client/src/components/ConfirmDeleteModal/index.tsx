import { observer } from 'mobx-react-lite';
import { memo } from 'react';

interface ConfirmDeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const ConfirmDeleteModal = memo(
	observer(({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) => {
		if (!isOpen) return null;

		return (
			<div className="modal">
				<div className="modal-content">
					<h2>Вы точно хотите удалить семинар?</h2>
					<div>
						<button onClick={onConfirm}>Да</button>
						<button onClick={onClose}>Нет</button>
					</div>
				</div>
			</div>
		);
	}),
);

export default ConfirmDeleteModal;
