import { Api } from '../Api'

class UserService {
  async getAllUsers() {
    return await Api.get('/users')
  }

  async getUserById(userId) {
    return await Api.get('/users' + userId)
  }
}

export default new UserService()
