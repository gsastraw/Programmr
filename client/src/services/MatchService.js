import { Api } from '../Api'

class MatchService {
  async getMatch(matchId) {
    return await Api.get('/matches/' + matchId)
  }

  async getMessage(matchId) {
    return await Api.get('/matches/' + matchId + '/conversation')
  }
}

export default new MatchService()
