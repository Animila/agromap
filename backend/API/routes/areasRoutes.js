// areasRoutes.js
const express = require('express')
const AreasController = require('../controllers/areasController')
const router = express.Router()

// Define your API routes for areas
router.get('/', async (req, res) => {
	const result = await AreasController.getAll()
	res.json(result)
})

router.post('/', (req, res) => {
	// Handle the areas endpoint logic for creating a new area
	res.json({ message: 'Area created successfully' })
})

// You can add more routes as needed

module.exports = router
