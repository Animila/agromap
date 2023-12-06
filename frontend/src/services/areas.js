import api from '@/http'

export default class AreasServices {
	static async getAll() {
		return api.get('/areas')
	}
}
