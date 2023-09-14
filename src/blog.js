import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Authorization, Post, Registration, Users } from './pages';
import { Footer, Header, Modal } from './components';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { useDispatch } from 'react-redux';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 0 20px;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	//используем хук и sessionStorage, чтобы авторизация не терялась при перезагрузке страницы
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		//Устанавливаем пользователя, сохранённого в sessionStorage. Следим за тем, чтобы тип данных roleId был Number.
		dispatch(setUser({
			...currentUserData,
			roleId: Number(currentUserData.roleId),
		}));
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path='/' element={<div>Главная страница</div>}></Route>
					<Route path='/login' element={<Authorization />}></Route>
					<Route path='/register' element={<Registration />}></Route>
					<Route path='/users' element={<Users />}></Route>
					<Route path='/post' element={<Post />}></Route>
					<Route path='/post/:id' element={<Post />}></Route>
					<Route path='/post/:id/edit' element={<Post />}></Route>
					<Route path='*' element={<div>Ошибка</div>}></Route>
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
