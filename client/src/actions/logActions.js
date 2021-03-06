import {
	GET_LOGS,
	SET_LOADING,
	LOGS_ERROR,
	ADD_LOGS,
	DELETE_LOG,
	UPDATE_LOG,
	SET_CURRENT,
	CLEAR_CURRENT,
	SEARCH_LOGS,
} from './types';

export const getLogs = () => async (dispatch) => {
	try {
		setLoading();

		const res = await fetch('/api/logs');
		const data = await res.json();

		dispatch({
			type: GET_LOGS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: LOGS_ERROR,
			payload: err.message,
		});
	}
};

export const searchLogs = (text) => async (dispatch) => {
	try {
		setLoading();

		const res = await fetch(`/api/logs?q=${text}`);
		const data = await res.json();

		dispatch({
			type: SEARCH_LOGS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: LOGS_ERROR,
			payload: err.message,
		});
	}
};

export const addLogs = (log) => async (dispatch) => {
	try {
		setLoading();

		const res = await fetch('/api/logs', {
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
			payload: err.message,
		});
	}
};

export const deleteLog = (id) => async (dispatch) => {
	try {
		setLoading();

		await fetch(`/api/logs/${id}`, {
			method: 'DELETE',
		});

		dispatch({
			type: DELETE_LOG,
			payload: id,
		});
	} catch (err) {
		dispatch({
			type: LOGS_ERROR,
			payload: err.message,
		});
	}
};

export const updateLog = (log) => async (dispatch) => {
	try {
		setLoading();

		const res = await fetch(`/api/logs/${log.id}`, {
			method: 'PUT',
			body: JSON.stringify(log),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		dispatch({
			type: UPDATE_LOG,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: LOGS_ERROR,
			payload: err.message,
		});
	}
};

export const setCurrent = (log) => {
	return {
		type: SET_CURRENT,
		payload: log,
	};
};

export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

export const setLoading = () => {
	return {
		type: SET_LOADING,
	};
};
