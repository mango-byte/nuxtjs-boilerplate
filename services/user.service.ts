import { BaseService } from 'vue-axios-http'

export default class UserService extends BaseService {
  constructor(props?: Record<string, any>) {
    super('users', props)
  }
}
