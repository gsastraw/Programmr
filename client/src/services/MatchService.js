import { Api } from '../Api'

class MatchService {
  async getMatch(matchId) {
    return await Api.get('/matches' + matchId)
  }
}

export default new MatchService()
