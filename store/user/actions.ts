import type { ActionContext } from 'vuex'
import { RegisterEntity } from '~/domain/user/entity'
import { UserService } from '~/services'

const service = new UserService()

export default {
  async register(ctx: ActionContext<any, any>, payload: RegisterEntity) {
    try {
      const { data } = await service.post(payload)
      ctx.commit('SET_REGISTER', data)
    } catch (e) {
      console.warn('e', e)
    }
  },
}
