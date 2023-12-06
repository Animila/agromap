const areasRoutes = require('./areasRoutes')

const Routes = (app, path) => {
	app.use(path + '/areas', areasRoutes)
}

module.exports = Routes
