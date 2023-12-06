const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const AreasController = {
	getAll: async () => {
		var data = null
		try {
			const result = await prisma.area.findMany()
			var newResult = []
			result.map(item => {
				newResult.push({
					id: item.id,
					coordinates: [JSON.parse(item.coordinates)],
				})
			})
			console.log('3')

			console.log('1', newResult)
			data = { success: true, data: newResult }
		} catch (e) {
			data = { success: false, message: e.message || 'Unknown error' }
		}
		return data
	},
}

module.exports = AreasController
