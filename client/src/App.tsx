import { memo } from 'react';
import { SeminarStore } from './models/SeminarStore';
import SeminarList from './components/SeminarList';
import './App.sass';
import { observer } from 'mobx-react-lite';

const store = SeminarStore.create({ seminars: [] });

const App = memo(
	observer(() => {
		return (
			<div className="wrapper">
				<SeminarList store={store} />
			</div>
		);
	}),
);

export default App;
