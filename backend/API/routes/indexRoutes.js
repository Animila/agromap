const areasRoutes = require('./areasRoutes')
const resRoutes = require('./resourceRoutes')

const Routes = (app, path) => {
	app.use(path + '/areas', areasRoutes)
	app.use(path + '/resource', resRoutes)
}

module.exports = Routes
