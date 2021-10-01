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

  async createDummyUser() {
    const user = {
      googleId: 420,
      firstName: 'Snoop',
      lastName: 'Dogg',
      dob: Date.now(),
      location: {
        long: 420,
        lat: 420
      },
      liked: [],
      disliked: [],
      bio: 'bruh',
      avatarUrl: 'https://img.discogs.com/AbpxmPZy-XIbahj491bC5nBVsnM=/600x837/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-132084-1529049936-5076.jpeg.jpg'
    }
    return await Api.post('/users', user)
  }
}

export default new UserService()
