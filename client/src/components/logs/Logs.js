import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {
	useEffect(() => {
		getLogs();
		//eslint-disable-next-line
	}, []);

	if (loading || logs === null) {
		return <Preloader />;
	}

	return (
		<ul className='collection width-header'>
			<li className='collection-header'>
				<h4 className='center'>System Logs</h4>
			</li>
			{!loading && logs.length === 0 ? (
				<p className='center'>No logs to show...</p>
			) : (
				logs.map((log) => <LogItem log={log} key={log._id} />)
			)}
		</ul>
	);
};

const mapStateToProps = (state) => ({
	log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);