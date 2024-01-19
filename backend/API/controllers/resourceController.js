const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const ResourceController = {
	getByIdArea: async id => {
		var data = null
		try {
			const resourceData = await prisma.resource.findMany(
				{where: {
					areaId: id
				}}
			)
			data = { success: true, data: resourceData }
		} catch (e) {
			data = { success: false, message: e.message || 'Неизвестная ошибка' }
		}
		return data
		
	},
	getAll: async () => {
		var data = null
		var owners = null
		try {
			const resultArea = await prisma.resource.findMany()

			// const newResult = await Promise.all(
			// 	resultArea.map(async item => {
			// 		const ownersIds = await prisma.ownerArea.findMany({
			// 			where: {
			// 				areaId: item.id,
			// 			},
			// 			select: {
			// 				ownerId: true,
			// 			},
			// 		})
			// 		if (ownersIds[0] && ownersIds[0].ownerId) {
			// 			owners = await prisma.owner.findFirst({
			// 				where: {
			// 					id: ownersIds[0].ownerId,
			// 				},
			// 			})
			// 		}

			// 		return {
			// 			id: item.id,
			// 			coordinates: [JSON.parse(item.coordinates)],
			// 			owners,
			// 		}
			// 	})
			// )

			data = { success: true, data: resultArea }
		} catch (e) {
			data = { success: false, message: e.message || 'Неизвестная ошибка' }
		}
		return data
	},
}

module.exports = ResourceController
