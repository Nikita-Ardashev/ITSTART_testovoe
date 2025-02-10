import { types, flow, cast, Instance, SnapshotIn } from 'mobx-state-tree';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/api/';

export interface ISeminar {
	id: number;
	title: string;
	description: string;
	date: Date;
	time: Date;
	photo: string;
}

export const Seminar = types.model('Seminar', {
	id: types.identifierNumber,
	title: types.string,
	description: types.string,
	date: types.string,
	time: types.string,
	photo: types.string,
});

export const SeminarStore = types
	.model('SeminarStore', {
		seminars: types.array(Seminar),
		error: types.maybe(types.string),
	})
	.actions((self) => ({
		fetchSeminars: flow(function* () {
			try {
				self.error = undefined;
				const response = yield axios.get<ISeminar[]>(SERVER_URL + 'seminars');
				self.seminars = cast(response.data);
			} catch (error) {
				self.error = 'Failed to fetch seminars';
				console.error('Error fetching seminars:', error);
			}
		}),
		deleteSeminar: flow(function* (id: number) {
			try {
				self.error = undefined;
				yield axios.delete(SERVER_URL + `seminars/${id}`);
				self.seminars = cast(self.seminars.filter((seminar) => seminar.id !== id));
			} catch (error) {
				self.error = 'Failed to delete seminar';
				console.error('Error deleting seminar:', error);
			}
		}),
		updateSeminar: flow(function* (seminar: SnapshotIn<typeof Seminar>) {
			try {
				self.error = undefined;
				const response = yield axios.put(
					SERVER_URL + `seminars/${seminar.id}`,
					seminar,
				);
				const index = self.seminars.findIndex((s) => s.id === seminar.id);
				if (index !== -1) {
					self.seminars[index] = cast(response.data);
				} else {
					self.seminars.push(cast(response.data));
				}
			} catch (error) {
				self.error = 'Failed to update seminar';
				console.error('Error updating seminar:', error);
			}
		}),
	}))
	.views((self) => ({
		get hasError() {
			return !!self.error;
		},
	}));
