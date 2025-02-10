import { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import SeminarItem from '../SeminarItem';
import { SeminarStore } from '../../models/SeminarStore';
import { Instance } from 'mobx-state-tree';
import './index.sass';
interface SeminarListProps {
	store: Instance<typeof SeminarStore>;
}

const SeminarList = memo(
	observer(({ store }: SeminarListProps) => {
		useEffect(() => {
			store.fetchSeminars();
		}, [store]);

		return (
			<div className="seminars__list">
				<h1>Seminars</h1>
				{store.seminars.map((seminar) => (
					<SeminarItem key={seminar.id} seminar={seminar} store={store} />
				))}
			</div>
		);
	}),
);

export default SeminarList;
