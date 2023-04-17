import Vuex from 'vuex'
import user from './user'
import createPersistedState from 'vuex-persistedstate'


export default new Vuex.Store({
    modules: {
        user
      },

      plugins: [createPersistedState()]
})