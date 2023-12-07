const express = require('express')
const { json, urlencoded } = require('body-parser')
const cors = require('cors')
const Routes = require('./API/routes/indexRoutes')

const app = express()
app.use(
	cors({ credentials: true, origin: 'https://hackaton-yakse.ru' }),
	json(),
	urlencoded({ extended: true })
)

Routes(app, '/api')

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
