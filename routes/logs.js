const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Log = require('../models/Logs');

router.get('/', async (req, res) => {
	try {
		const log = await Log.find(req.log);
		res.json(log);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});
router.post(
	'/',
	[[check('message', 'Message Required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { message, tech, attention } = req.body;
		try {
			const newLog = new Log({
				message,
				tech,
				attention,
			});
			const log = await newLog.save();
			res.json(log);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('server error');
		}
	}
);
router.put('/:id', async (req, res) => {
	const { message, tech, attention } = req.body;
	const logFields = {};
	if (message) logFields.message = message;
	if (tech) logFields.tech = tech;
	if (attention) logFields.attention = attention;

	try {
		let log = await Log.findById(req.params.id);
		if (!log) return res.status(404).json({ msg: 'Log not found' });

		contact = await Log.findByIdAndUpdate(
			req.params.id,
			{ $set: logFields },
			{ new: true }
		);
		res.json(log);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});
router.delete('/:id', async (req, res) => {
	try {
		let log = await Log.findById(req.params.id);
		if (!log) return res.status(404).json({ msg: 'Log not found' });

		await Log.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Log deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
