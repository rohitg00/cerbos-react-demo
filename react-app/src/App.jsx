import {Embedded as Cerbos} from '@cerbos/embedded';
import {CerbosProvider} from '@cerbos/react';

import {Route, Routes} from 'react-router-dom';
import {HomePage, CoursesPage} from './Pages';

const client = new Cerbos(
	await fetch(
		'https://lite.cerbos.cloud/bundle?workspace=P8E4H3Z2BO24&label=f481a2c9c90ee3ae4deae7b7f656d65d1cd608828f5853d21e9ca383d479223a'
	)
);

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/courses/*" element={<ProtectedCoursesPage />} />
		</Routes>
	);
};

export default App;

import userService from './services/userService';
import {getAccessToken} from './services/tokenStorage';

const ProtectedCoursesPage = () => {
	const currentUser = userService.getUserId(getAccessToken());

	return (
		<CerbosProvider
			client={client}
			principal={{
				id: currentUser?.id,
				roles: currentUser?.roles,
			}}
		>
			<Routes>
				<Route path="/" element={<CoursesPage />} />
			</Routes>
		</CerbosProvider>
	);
};
