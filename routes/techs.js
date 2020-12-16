const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Tech = require('../models/Techs');

router.get('/', async (req, res) => {
	try {
		const tech = await Tech.find(req.tech);
		console.log(tech);
		res.json(tech);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

router.post(
	'/',
	[
		[check('firstName', 'First name Required').not().isEmpty()],
		[check('lastName', 'Last name Required').not().isEmpty()],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { firstName, lastName } = req.body;
		try {
			const newTech = new Tech({
				firstName,
				lastName,
			});
			const tech = await newTech.save();
			res.json(tech);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('server error');
		}
	}
);

router.delete('/:id', async (req, res) => {
	try {
		let tech = await Tech.findById(req.params.id);
		if (!tech) return res.status(404).json({ msg: 'Tech not found' });

		await Tech.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Tech deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
