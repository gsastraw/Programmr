import { Api } from '../Api'

class UserService {
  async getAllUsers() {
    return await Api.get('/users')
  }

  async getUserById(userId) {
    return await Api.get('/users' + userId)
  }

  async createUser(user) {
    return await Api.post('/users', user)
  }
}

export default new UserService()
