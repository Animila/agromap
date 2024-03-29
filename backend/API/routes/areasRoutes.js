const express = require('express')
const AreasController = require('../controllers/areasController')
const router = express.Router()

router.get('/', async (req, res) => {
	const result = await AreasController.getAll()
	res.json(result)
})

router.post('/', (req, res) => {
	res.json({ message: 'Area created successfully' })
})

// You can add more routes as needed

module.exports = router
