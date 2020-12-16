import React from 'react';
import { connect } from 'react-redux';
import { deleteTech } from '../../actions/techActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech: { firstName, lastName, _id }, deleteTech }) => {
	const removeTech = () => {
		deleteTech(_id);
		M.toast({ html: `${firstName} ${lastName} was removed from techs` });
	};

	return (
		<li className='collection-item'>
			<div>
				{firstName} {lastName}
				<a href='#!' className='secondary-content' onClick={removeTech}>
					<i className='material-icons grey-text'>delete</i>
				</a>
			</div>
		</li>
	);
};

export default connect(null, { deleteTech })(TechItem);
