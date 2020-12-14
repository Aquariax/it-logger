import React, { useState, useEffect } from 'react';
import TechItem from './TechItem';
import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';

const TechListModal = ({ getTechs, tech: { techs, loading } }) => {
	useEffect(() => {
		getTechs();
		//eslint-disable-next-line
	}, []);

	// const getTechs = async () => {
	// 	setLoading(true);
	// 	const res = await fetch('/techs');
	// 	const data = await res.json();

	// 	setTechs(data);
	// 	setLoading(false);
	// };

	return (
		<div id='tech-list-modal' className='modal'>
			<div className='modal-content'>
				<h4>Technician List</h4>
				<ul className='collection'>
					{!loading &&
						techs !== null &&
						techs.map((tech) => (
							<TechItem tech={tech} key={tech.id} className='collection-item' />
						))}
				</ul>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
