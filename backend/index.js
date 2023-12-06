const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')
const { json, urlencoded } = require('body-parser')

const prisma = new PrismaClient()

const typeDefs = gql`
	type Area {
		id: Int
		coordinates: String
		resources: [Resource]
		owners: [OwnerArea]
	}

	type Resource {
		id: Int
		area: Area
		areaId: Int
		type: String
		details: String
	}

	type Owner {
		id: Int
		areas: [OwnerArea]
		ownerData: String
	}

	type OwnerArea {
		id: Int
		owner: Owner
		ownerId: Int
		area: Area
		areaId: Int
	}

	type Query {
		areas: [Area]
		resources: [Resource]
		owners: [Owner]
		ownerAreas: [OwnerArea]
	}

	type Mutation {
		createArea(coordinates: String): Area
		createResource(areaId: Int, type: String, details: String): Resource
		createOwner(ownerData: String): Owner
		createOwnerArea(ownerId: Int, areaId: Int): OwnerArea
	}
`

const resolvers = {
	Query: {
		areas: async (parent, args, { prisma }) => {
			return prisma.area.findMany()
		},
		resources: async (parent, args, { prisma }) => {
			return prisma.resource.findMany()
		},
		owners: async (parent, args, { prisma }) => {
			return prisma.owner.findMany()
		},
		ownerAreas: async (parent, args, { prisma }) => {
			return prisma.ownerArea.findMany()
		},
	},
	Mutation: {
		createArea: async (parent, { coordinates }, { prisma }) => {
			return prisma.area.create({ data: { coordinates } })
		},
		createResource: async (parent, { areaId, type, details }, { prisma }) => {
			return prisma.resource.create({ data: { areaId, type, details } })
		},
		createOwner: async (parent, { ownerData }, { prisma }) => {
			return prisma.owner.create({ data: { ownerData } })
		},
		createOwnerArea: async (parent, { ownerId, areaId }, { prisma }) => {
			return prisma.ownerArea.create({ data: { ownerId, areaId } })
		},
	},
	Area: {
		resources: async (parent, args, { prisma }) => {
			return prisma.area.findUnique({ where: { id: parent.id } }).resources()
		},
		owners: async (parent, args, { prisma }) => {
			return prisma.area.findUnique({ where: { id: parent.id } }).owners()
		},
	},
	Resource: {
		area: async (parent, args, { prisma }) => {
			return prisma.resource.findUnique({ where: { id: parent.id } }).area()
		},
	},
	Owner: {
		areas: async (parent, args, { prisma }) => {
			return prisma.owner.findUnique({ where: { id: parent.id } }).areas()
		},
	},
	OwnerArea: {
		owner: async (parent, args, { prisma }) => {
			return prisma.ownerArea.findUnique({ where: { id: parent.id } }).owner()
		},
		area: async (parent, args, { prisma }) => {
			return prisma.ownerArea.findUnique({ where: { id: parent.id } }).area()
		},
	},
}
const startServer = async () => {
	const app = express()
	app.use(cors(), json(), urlencoded({ extended: true }))

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({ prisma }),
	})

	await server.start()

	server.applyMiddleware({ app })

	const PORT = process.env.PORT || 3000
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}/graphql`)
	})
}

startServer()
