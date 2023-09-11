import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: true,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: true,
			};

		case ACTION_TYPE.SET_USER:
			return {
				...state,
				wasLogout: false,
			};
		default:
			return state;
	}
};
