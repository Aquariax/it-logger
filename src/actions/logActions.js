import {
	GET_LOGS,
	SET_LOADING,
	LOGS_ERROR,
	ADD_LOGS,
	DELETE_LOG,
} from './types';

// export const getLogs = () => {
// 	return (dispatch)=>{
//         setLoading()

//         const res = await fetch('/logs')
//         const data = await res.json()

//         dispatch({
//             type: GET_LOGS,
//             payload: data
//         })
//     };
// };

export const getLogs = () => async (dispatch) => {
	try {
		setLoading();

		const res = await fetch('/logs');
		const data = await res.json();

		dispatch({
			type: GET_LOGS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: LOGS_ERROR,
			payload: err.respnse.msg,
		});
	}
};

export const addLogs = (log) => async (dispatch) => {
	try {
		setLoading();

		const res = await fetch('/logs', {
			method: 'POST',
			body: JSON.stringify(log),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		dispatch({
			type: ADD_LOGS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: LOGS_ERROR,
			payload: err.respnse.msg,
		});
	}
};

export const deleteLog = (id) => async (dispatch) => {
	try {
		setLoading();

		const res = await fetch(`/logs/${id}`, {
			method: 'DELETE',
		});
		const data = await res.json();

		dispatch({
			type: DELETE_LOG,
			payload: id,
		});
	} catch (err) {
		dispatch({
			type: LOGS_ERROR,
			payload: err.respnse.msg,
		});
	}
};
export const setLoading = () => {
	return {
		type: SET_LOADING,
	};
};
