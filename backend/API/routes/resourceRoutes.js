const express = require('express')
const AreasController = require('../controllers/areasController')
const ResourceController = require('../controllers/resourceController')
const router = express.Router()

router.get('/:idArea', async (req, res) => {
	const { idArea } = req.params
	const result = await ResourceController.getByIdArea(parseInt(idArea))
	res.json(result)
})

router.post('/', (req, res) => {
	res.json({ message: 'Area created successfully' })
})

// You can add more routes as needed

module.exports = router
