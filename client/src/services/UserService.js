import { Api } from '../Api'

class UserService {
  async getAllUsers() {
    return await Api.get('/users')
  }

  async getUserById(userId) {
    return await Api.get('/users/' + userId)
  }

  async createUser(user) {
    return await Api.post('/users/', user)
  }

  async getRecommendedUsers(userId) {
    return await Api.get('/users/' + userId + '/suggest')
  }

  // posts dislike or like on user
  async postSwipeStatus(userId, targetId, status) {
    return await Api.post('/users/' + userId + '/match', {
      id: `${targetId}`,
      status: status
    })
  }
}

export default new UserService()
